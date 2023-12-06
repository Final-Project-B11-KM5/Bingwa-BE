const router = require("express").Router();
const { createNotification } = require("../controllers/notification.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", Auth, checkRole(["admin"]), createNotification);

module.exports = router;
