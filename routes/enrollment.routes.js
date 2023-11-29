const router = require("express").Router();
const { getAllEnrollment } = require("../controllers/enrollment.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["user", "admin"]), getAllEnrollment);

module.exports = router;
