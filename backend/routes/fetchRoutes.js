const express = require("express");
const { getDataController } = require("../controllers/fetchController");

const router = express.Router();

router.post("/data", getDataController);

module.exports = router;
