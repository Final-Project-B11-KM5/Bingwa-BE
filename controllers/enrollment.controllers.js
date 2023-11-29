const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllEnrollment: async (req, res, next) => {
    try {
      let enrollments = await prisma.enrollment.findMany({
        where: { userId: req.user.id },
        include: {
          course: {
            include: {
              category: true,
              chapter: {
                include: {
                  lesson: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({
        status: true,
        message: "Get all category successful",
        data: { enrollments },
      });
    } catch (err) {
      next(err);
    }
  },
};
