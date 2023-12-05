const router = require("express").Router();
const { getAllPayments } = require("../controllers/payment.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["admin"]), getAllPayments);

module.exports = router;
