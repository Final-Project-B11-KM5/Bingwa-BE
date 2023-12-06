const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllPayments: async (req, res, next) => {
    try {
      const { search } = req.query;

      const payments = await prisma.payment.findMany({
        where: {
          OR: [
            { status: { contains: search, mode: "insensitive" } },
            { course: { courseName: { contains: search, mode: "insensitive" } } },
            { user: { userProfile: { fullName: { contains: search, mode: "insensitive" } } } },
            { course: { category: { categoryName: { contains: search, mode: "insensitive" } } } },
          ],
        },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
          course: {
            include: {
              category: true,
            },
          },
        },
      });

      res.status(200).json({
        status: true,
        message: "Get all payments successful",
        data: { payments },
      });
    } catch (err) {
      next(err);
    }
  },

  getPaymentHistory: async (req, res, next) => {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          userId: Number(req.user.id),
        },
        include: {
          course: {
            include: {
              category: true,
            },
          },
        },
      });

      res.status(200).json({
        status: true,
        message: "Get all payment history successful",
        data: { payments },
      });
    } catch (err) {
      next(err);
    }
  },
};
