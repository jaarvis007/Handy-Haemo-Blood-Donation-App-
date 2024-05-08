const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
  UpdateController,sendOTP
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/userModel");
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/sendotp", sendOTP);
// router.post("/upd", UpdateController);


router.post("/update", async (req, res) => {

     console.log(req.body);


    try {
        // Find the user by ID
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const name=req.body.name;
        const location=req.body.location;
        const bloodtype=req.body.bloodtype;

        // Update fields conditionally based on incoming data
        if (name && name !== user.name) {
            user.name = name;
        }
        if (bloodtype && bloodtype !== user.bloodtype) {
            user.bloodtype = bloodtype;
        }
        if (location && location !== user.location) {
            user.location = location;
        }

        // Save the updated user document
        const updatedUser = await user.save();
        res.status(200).send({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get current user route
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
