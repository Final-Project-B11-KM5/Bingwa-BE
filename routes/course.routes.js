const router = require("express").Router();
const { createCourse, editCourse, deleteCourse, detailCourse, showAllCourse, getCourse } = require("../controllers/course.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", Auth, checkRole(["admin"]), createCourse);
router.get("/", Auth, checkRole(["admin"]), showAllCourse);
router.get("/:idCourse", Auth, checkRole(["admin"]), detailCourse);
router.put("/:idCourse", Auth, checkRole(["admin"]), editCourse);
router.delete("/:idCourse", Auth, checkRole(["admin"]), deleteCourse);
router.get("/course", getCourse);

module.exports = router;
