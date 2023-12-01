const router = require("express").Router();
const { createPromotion, getAllPromotions, getPromotionById } = require("../controllers/promotion.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["admin"]), getAllPromotions);
router.post("/", Auth, checkRole(["admin"]), createPromotion);
router.get("/:id", Auth, checkRole(["admin"]), getPromotionById);

module.exports = router;
