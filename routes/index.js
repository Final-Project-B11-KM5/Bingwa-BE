const router = require("express").Router();
const User = require("./user.routes");
const UserProfile = require("./userProfile.routes");
const Category = require("./category.routes");
const Course = require("./kelas.routes")
// API
router.use("/api/v1/users", User);
router.use("/api/v1/user-profiles", UserProfile);
router.use("/api/v1/category", Category);
router.use("/api/v1/course", Course);
module.exports = router;
