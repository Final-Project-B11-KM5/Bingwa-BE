const router = require("express").Router();
const { getCoures } = require("../controllers/course.controller");

router.get('/course', getCoures)


module.exports = router;
