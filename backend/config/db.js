const mongoose = require("mongoose");
const colors = require("colors");

// MONGO_URL='mongodb+srv://aman_jain:Aman2001@aman.k8abeqp.mongodb.net/blood-donation'
MONGO_URL='mongodb+srv://ritishasingh74:k97ZXVmsVSABxUNY@cluster0.njrsi0t.mongodb.net/blood-donation'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
