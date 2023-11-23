const router = require("express").Router();
const { register, login, verifyOtp, resendOtp } = require("../controllers/user.controllers");

router.post("/register", register);
router.post("/login", login);
router.put("/verify-otp", verifyOtp);
router.put("/resend-otp", resendOtp);

module.exports = router;
