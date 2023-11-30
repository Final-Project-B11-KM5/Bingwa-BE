const router = require("express").Router();
const {
  createLesson,
  getAllLessons,
  getDetailLesson,
  updateDetailLesson,
  deleteLessonById,
  searchLesson,
  showLessonByCourse
} = require("../controllers/lesson.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", getAllLessons);
router.post("/", Auth, checkRole(["admin"]), createLesson);
router.get("/search", Auth, checkRole(["admin"]), searchLesson); //search Lesson for Admin
router.get("/:idCourse/course", showLessonByCourse);  //show Lesson by Course 
router.get("/:id", Auth, checkRole(["user", "admin"]), getDetailLesson);
router.put("/:id", Auth, checkRole(["admin"]), updateDetailLesson);
router.delete("/:id", Auth, checkRole(["admin"]), deleteLessonById);

module.exports = router;
