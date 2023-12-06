const router = require("express").Router();
const { createNotification, markNotificationsAsRead } = require("../controllers/notification.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", Auth, checkRole(["admin"]), createNotification);
router.put("/markAsRead", Auth, checkRole(["user", "admin"]), markNotificationsAsRead);

module.exports = router;
