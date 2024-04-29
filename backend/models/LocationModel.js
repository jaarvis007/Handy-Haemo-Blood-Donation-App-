const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    email:{
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    coords: {
    accuracy: Number,
    altitude: Number,
    altitudeAccuracy: Number,
    heading: Number,
    latitude: Number,
    longitude: Number,
    speed: Number
    },
    visible:{
      type:Boolean,
      
    },
    mocked: Boolean,
    timestamp: Date,
  });

module.exports = mongoose.model("userLocation", LocationSchema);
