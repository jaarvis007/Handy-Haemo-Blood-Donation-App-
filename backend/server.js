const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
//dotenv config
dotenv.config();

// db connection
connectDB();

//express config
const app = express();

const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/fetch", require("./routes/fetchRoutes"));
app.use("/api/v1/func", require("./routes/funcRoutes"));
app.use("/api/v1/location",require("./routes/locationRoutes"));

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgBlue.white);
});
