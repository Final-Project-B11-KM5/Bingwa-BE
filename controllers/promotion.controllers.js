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
};
