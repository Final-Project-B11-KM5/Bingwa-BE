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

  getDetailEnrollment: async (req, res, next) => {
    try {
      const enrollmentId = req.params.id;

      let enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
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

      if (!enrollment) {
        return res.status(404).json({
          status: false,
          message: "Enrollment not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Get detail enrollment successful",
        data: { enrollment },
      });
    } catch (err) {
      next(err);
    }
  },
};
