const router = require("express").Router();
const { register } = require("../controllers/user.controllers");

router.post("/register", register);

module.exports = router;
