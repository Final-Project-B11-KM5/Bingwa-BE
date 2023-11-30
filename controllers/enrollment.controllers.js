const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  courseEnrollment: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const user = req.user;
      const course = await prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
