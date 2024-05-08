const { Router } = require("express");
const router = Router();
const { forgotPassword, resetPassword } = require("../controllers/passwordController");

router.post("/forgot-password",forgotPassword);
router.post("/:userId/:userToken",resetPassword)


module.exports=router;
