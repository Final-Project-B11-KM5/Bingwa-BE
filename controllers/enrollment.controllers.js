const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  courseEnrollment: async (req, res, next) => {
    //for free course
    try {
      const { courseId } = req.params;
      const { id } = req.user;
      const course = await prisma.course.findUnique({
        where: {
          id: Number(courseId),
        },
      });
      if (!course) {
        return res.status(404).json({
          status: false,
          message: `Course not found with id ${courseId}`,
          data: null,
        });
      }
      
      const statusEnrollUser = await prisma.enrollment.findFirst({
        where: {
          courseId:Number(courseId),
          userId: id,
        },
      });
      // check user alredy enrol course or not
      if (statusEnrollUser) {
        return res.status(400).json({
          status: false,
          message: `User Alrady Enroll this COurse`,
          data: null,
        });
      }
      let enrollCourse = await prisma.enrollment.create({
        data: {
          isPaid: course.isPremium,
          userId: id,
          courseId: Number(courseId),
        },
      });
      res.status(201).json({
        status: true,
        message: "Succes To Enroll Course",
        data: enrollCourse,
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
