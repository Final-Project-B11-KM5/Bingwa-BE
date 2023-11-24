const router = require("express").Router();
const { createCourse,editCourse } = require("../controllers/kelas.controllers");
const Auth = require("../middlewares/authentication");
const { authorize } = require("../utils/role");
router.use(Auth);

router.post("/", authorize, createCourse);
router.put("/:idCourse", authorize, editCourse);

module.exports = router;
