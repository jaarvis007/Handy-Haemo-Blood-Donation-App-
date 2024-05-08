const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator =require("otp-generator");
const OTP=require("../models/OTP");



const registerController = async (req, res) => {
  try {
    const {name, email, password, bloodtype, location, phone, donationCnt, requestCnt, notification, donationReq,otp } = req.body;
    console.log(req.body);

    // Email format validation
  /*  const emailRegex = /@mnnit\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(200).json({
        success: false,
        message: "Email must be in @mnnit.ac.in format",
      });
    }*/
    console.log(req.body);

    if (!name || !email || !password || !bloodtype ||  !location || !phone  || !otp) {
      return res.status(202).json({
        success: false,
        message: "Please enter all the required fields",
      });
    }

   

    // Find the user's OTP
    const userOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
    console.log(userOTP);

    if (!userOTP) {
      return res.status(204).json({
        success: false,
        message: "OTP not found for this email",
      });
    }

    // Verify OTP
    if (otp !== userOTP.otp) {
      return res.status(205).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Delete OTP after successful verification
    await OTP.deleteOne({ email });

    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

   

    const newUserDetails = {
      name, 
      email, 
      password, 
      bloodtype, 
      location, 
      phone, 
      donationCnt, 
      requestCnt, 
      notification, 
      donationReq
    };

    const createdUser = await userModel.create(newUserDetails);

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      createdUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const UpdateController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User ALready exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email Not Found",
      });
    }
    
    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Password Not Match",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};
const sendOTP = async (req, res) => {
  try {
    //fetch email from request ki body
    const { email } = req.body;
    console.log(email);

    //check if user already exist
    const checkUserPresent = await userModel.findOne({ email });
    console.log(checkUserPresent);
    ///if user already exist , then return a response
    if (checkUserPresent) {
      return res.json({
        success: false,
        message: "User already registered",
      }).status(401);
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated: ", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //create an entry for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { registerController, loginController, currentUserController,UpdateController,sendOTP };