const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createPromotion: async (req, res, next) => {
    try {
      const { discount, startDate, endDate } = req.body;

      const newPromotion = await prisma.promotion.create({
        data: { discount, startDate, endDate },
      });

      res.status(201).json({
        status: true,
        message: "Promotion created successfully",
        data: { newPromotion },
      });
    } catch (err) {
      next(err);
    }
  },

  getAllPromotions: async (req, res, next) => {
    try {
      const promotions = await prisma.promotion.findMany();

      res.status(200).json({
        status: true,
        message: "Get all promotions successful",
        data: { promotions },
      });
    } catch (err) {
      next(err);
    }
  },

  getPromotionById: async (req, res, next) => {
    try {
      const promotionId = req.params.id;

      const promotion = await prisma.promotion.findUnique({
        where: { id: Number(promotionId) },
      });

      if (!promotion) {
        return res.status(404).json({
          status: false,
          message: "Promotion not found",
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "Get detail promotion successful",
        data: { promotion },
      });
    } catch (err) {
      next(err);
    }
  },
};
