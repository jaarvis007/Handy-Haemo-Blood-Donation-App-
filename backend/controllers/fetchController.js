const userModel = require("../models/userModel");

const getDataController = async (req, res) => {
  console.log("1");
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDataController };
