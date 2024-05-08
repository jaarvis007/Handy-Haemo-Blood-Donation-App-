const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true, // Trim whitespace from the beginning and end of the email
      lowercase: true, // Convert email to lowercase
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    coords: {
      type: {
        accuracy: { type: Number, default: 0 }, // Set default value for accuracy
        altitude: Number,
        altitudeAccuracy: Number,
        heading: Number,
        latitude: { type: Number, required: true }, // Latitude is required
        longitude: { type: Number, required: true }, // Longitude is required
        speed: Number,
      },
    },
    visible: {
      type: Boolean,
      default: false, // Set default value for visibility
    },
    mocked: {
      type: Boolean,
      default: false, // Set default value for mocked
    },
    timestamp: {
      type: Date,
      default: Date.now, // Set default value to current timestamp
    },
  },
  {
    toJSON: { virtuals: true }, // Include virtual properties in JSON output
    toObject: { virtuals: true }, // Include virtual properties in object output
  }
);

// Add compound index for email and timestamp for efficient queries
LocationSchema.index({ email: 1, timestamp: -1 });

// Virtual property to calculate age of location data
LocationSchema.virtual("age").get(function () {
  return Date.now() - this.timestamp;
});

module.exports = mongoose.model("userLocation", LocationSchema);
