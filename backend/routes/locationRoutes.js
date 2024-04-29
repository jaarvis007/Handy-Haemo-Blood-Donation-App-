// Assuming you have already set up Express and connected to MongoDB with Mongoose
const express = require('express');
const router = express.Router();
const Location = require('../models/LocationModel');

// Handle POST requests to save location data
router.post('/update-location', async (req, res) => {
  try {
    // Extract latitude, longitude, and other data from the request body
    const { email, coords, mocked, timestamp, visible } = req.body;

    // Check if a document with the email already exists in the database
    let existingLocation = await Location.findOne({ email });

    if (existingLocation) {
      // If the document exists, update its fields
      existingLocation.coords = coords;
      existingLocation.mocked = mocked;
      existingLocation.timestamp = timestamp;
      existingLocation.visible = visible;

      // Save the updated location document
      await existingLocation.save();
      res.status(200).send('Location data updated successfully');
    } else {
      // If the document doesn't exist, create a new location document
      const newLocation = new Location({
        email,
        coords,
        mocked,
        timestamp,
        visible
      });

      // Save the new location document to the database
      await newLocation.save();
      res.status(201).send('Location data saved successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
