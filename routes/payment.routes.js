const router = require("express").Router();
const { getAllPayments, getPaymentHistory,createPayment,getDetailPayment } = require("../controllers/payment.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/:idCourse/course",Auth,checkRole(["user"]),createPayment);
router.get("/:idCourse/course",getDetailPayment);
router.get("/", Auth, checkRole(["admin"]), getAllPayments);
router.get("/history", Auth, checkRole(["user", "admin"]), getPaymentHistory);

module.exports = router;
