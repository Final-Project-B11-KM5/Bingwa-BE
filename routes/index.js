const router = require("express").Router();
const User = require("./user.routes");
const UserProfile = require("./userProfile.routes");

// API
router.use("/api/v1/users", User);
router.use("/api/v1/user-profiles", UserProfile);

module.exports = router;
