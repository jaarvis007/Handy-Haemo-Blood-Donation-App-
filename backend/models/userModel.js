const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requied"],
    },
    bloodtype: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "bloodtype is requied"],
    },
    location: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone number is required"],
    },
    donationCnt: {
      type: Number,
      default: 0, // Default value for points is zero
    },
    requestCnt: {
      type: Number,
      default: 0,
    },
    notification: {
      type: Array,
      default: [],
    },
    donationReq: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
