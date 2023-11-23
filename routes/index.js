const router = require("express").Router();
const User = require("./user.routes");

// API
router.use("/api/v1/users", User);

module.exports = router;
