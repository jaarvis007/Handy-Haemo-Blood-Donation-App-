const express = require("express");
const { testController } = require("../controllers/testControllers");

//router obj
const router = express.Router();

router.get("/", testController);

module.exports = router;
