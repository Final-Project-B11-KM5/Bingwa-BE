const router = require("express").Router();
const {
  getAllEnrollment,
  getDetailEnrollment,
  courseEnrollment,
} = require("../controllers/enrollment.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/:courseId/course", Auth, courseEnrollment);
router.get("/", Auth, checkRole(["user", "admin"]), getAllEnrollment);
router.get("/:id", Auth, checkRole(["user", "admin"]), getDetailEnrollment);

module.exports = router;
