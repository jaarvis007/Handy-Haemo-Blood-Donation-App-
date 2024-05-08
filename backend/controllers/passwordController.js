const UserModel = require("../models/userModel");
const Token = require("../models/token");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
const { resetTemplate } = require("../utils/email/template/resetPassword");
const bcrypt=require("bcrypt");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; // Extract email from req.body
        console.log(email);

        if (!email) {
            return res.status(400).send("Email is required");
        }

        const userObject = await UserModel.findOne({ email });
        console.log("user = ",userObject);
        if (!userObject) {
            return res.status(400).send("User with the given email doesn't exist");
        }

        let token = await Token.findOne({ userId: userObject._id }); // Use userObject instead of user
        if (!token) {
            token = await new Token({
                userId: userObject._id, // Use userObject instead of user
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `Link to reset password:`+ `${process.env.CLIENT_URL}/reset-password/${userObject._id}/${token.token}`;
        console.log("link= ",link);
        const response = await mailSender(userObject.email, "Password reset", link); // Use userObject.email instead of user.email
        console.log(response);
        res.send("Password reset link sent to your email account");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}

const resetPassword = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) return res.status(400).json({ success: false, message: "Invalid link or expired" });

        // Find the latest token for the user
        const token = await Token.findOne({
            userId: user._id,
        }).sort({ createdAt: -1 });

        const id = token._id;

        if (!token || token.token !== req.params.userToken) {
            return res.status(400).json({ success: false, message: "Invalid link or expired" });
        }

        // Hash the new password
       
        // Save the new password
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
        user.password = req.body.password;
        console.log("password= ",req.body.password);
        await user.save();
        

        // Delete the token
       /* await Token.findByIdAndDelete({
            _id: id
        });*/

        res.status(201).json({ success: true, message: "Password reset successfully" ,user});

    } catch (error) {
        res.status(500).send({ success: false, message: "An error occurred" });
        console.error(error);
    }
}

module.exports = { forgotPassword, resetPassword };
