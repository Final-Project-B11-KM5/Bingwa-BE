const router = require("express").Router();
const { getAllEnrollments, getDetailEnrollment } = require("../controllers/enrollment.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["user", "admin"]), getAllEnrollments);
router.get("/:id", Auth, checkRole(["user", "admin"]), getDetailEnrollment);

module.exports = router;
