const router = require("express").Router();
const { getAllPayments, getPaymentHistory } = require("../controllers/payment.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["admin"]), getAllPayments);
router.get("/history", Auth, checkRole(["user", "admin"]), getPaymentHistory);

module.exports = router;
