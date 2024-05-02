// Assuming you have already set up Express and connected to MongoDB with Mongoose
const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const Location = require('../models/LocationModel');

// Handle POST requests to save location data
router.get("/getLocations", async (req, res) => {
  try {
    Location.find().then((data) => {
      // console.log(data);
      res.status(200).json({ data: data });
    }).catch((e) => {
      console.log(e);
      res.status(500).json({ msg: "unable to find data" });
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "unable to get data" });
  }
});

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


router.get('/nearest', async (req, res) => {
  const { latitude, longitude } = req.query;

  // Log the received query parameters
  console.log(req.query);

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  // Parse latitude and longitude as floats
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  // Query the database to find all locations
  try {
    const locations = await Location.find().lean().exec();

    // Calculate distance from each location to the provided coordinates
    const locationsWithDistance = locations.map(location => {
      const distance = geolib.getDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: lat, longitude: lon }
      );
      return { ...location, distance };
    });

    // Sort locations by distance in ascending order
    locationsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return the nearest location
    res.json(locationsWithDistance);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching nearest location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;
