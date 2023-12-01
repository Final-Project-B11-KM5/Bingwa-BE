const router = require("express").Router();
const { createPromotion } = require("../controllers/promotion.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", createPromotion);

module.exports = router;
