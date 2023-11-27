const router = require("express").Router();
const { createLesson, getAllLessons, getDetailLesson, updateDetailLesson } = require("../controllers/lesson.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", Auth, checkRole(["admin"]), createLesson);
router.get("/", getAllLessons);
router.get("/:id", Auth, checkRole(["user", "admin"]), getDetailLesson);
router.put("/:id", Auth, checkRole(["admin"]), updateDetailLesson);

module.exports = router;
