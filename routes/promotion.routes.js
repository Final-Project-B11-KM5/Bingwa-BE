const router = require("express").Router();
const { createPromotion, getAllPromotions } = require("../controllers/promotion.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", getAllPromotions);
router.post("/", createPromotion);

module.exports = router;
