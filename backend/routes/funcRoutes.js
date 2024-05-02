const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

router.post("/sendReq", async (req, res) => {
  try {
    const currUser = req.body.currUser;
    const targetUser = req.body.targetUser;

    // Check if currUser and targetUser are provided
    if (!currUser || !targetUser) {
      return res.status(400).send({
        success: false,
        message:
          "Invalid request. Please provide both currUser and targetUser.",
      });
    }

    // Find the target user
    const user = await userModel.findOne({ email: targetUser.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Target user not found",
      });
    }

    // Check if currUser is already in donationReq array
    if (user.donationReq.some((reqUser) => reqUser.email === currUser.email)) {
      return res.status(400).send({
        success: false,
        message: "Request already sent to this user",
      });
    }
    // Push currUser into donationReq array
    user.donationReq.push(currUser.email);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

router.post("/removeReq", async (req, res) => {
  console.log(1);
  try {
    const currUser = req.body.currUser;
    const targetUser = req.body.targetUser;
    console.log(currUser);
    console.log(targetUser);

    // Check if currUser and targetUser are provided
    if (!currUser || !targetUser) {
      return res.status(400).send({
        success: false,
        message:
          "Invalid request. Please provide both currUser and targetUser.",
      });
    }

    // Find the current user
    const user = await userModel.findOne({ email: currUser.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Current user not found",
      });
    }

    // Check if the target user is in the donationReq array
    const index = user.donationReq.findIndex(
      (reqUser) => reqUser.email === targetUser.email
    );
    if (index === -1) {
      return res.status(404).send({
        success: false,
        message: "Target user not found in current user's donation requests",
      });
    }

    // Remove the target user from the donationReq array
    user.donationReq.splice(index, 1);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
