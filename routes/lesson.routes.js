const router = require("express").Router();
const { createLesson } = require("../controllers/lesson.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", Auth, checkRole(["admin"]), createLesson);

module.exports = router;
