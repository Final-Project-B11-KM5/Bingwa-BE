const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  courseEnrollment: async (req, res, next) => {
    try {
      const { courseId } = req.params;

      if (isNaN(courseId)) {
        return res.status(400).json({
          status: false,
          message: "Invalid courseId provided",
          data: null,
        });
      }

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
          courseId: Number(courseId),
          userId: Number(req.user.id),
        },
      });

      if (statusEnrollUser) {
        return res.status(400).json({
          status: false,
          message: `User Alrady Enroll this Course`,
          data: null,
        });
      }

      if (course.isPremium) {
        return res.status(400).json({
          status: false,
          message: "This course is premium. You must pay before enrolling.",
          data: null,
        });
      }

      let enrollCourse = await prisma.enrollment.create({
        data: {
          userId: Number(req.user.id),
          courseId: Number(courseId),
        },
      });

      const lessons = await prisma.lesson.findMany({
        where: {
          chapter: {
            courseId: Number(courseId),
          },
        },
      });

      const trackingRecords = await Promise.all(
        lessons.map(async (lesson) => {
          return prisma.tracking.create({
            data: {
              userId: Number(req.user.id),
              lessonId: lesson.id,
              courseId:Number(courseId),
              status: false,
            },
            include: {
              lesson: {
                select: {
                  lessonName: true,
                },
              },
            },
          });
        })
      );

      res.status(201).json({
        status: true,
        message: "Succes To Enroll Course",
        data: { enrollCourse, trackingRecords },
      });
    } catch (err) {
      next(err);
    }
  },

  getAllEnrollment: async (req, res, next) => {
    try {
      const enrollments = await prisma.enrollment.findMany({
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
        message: "Get all enrollments successful",
        data: { enrollments, trackingCourse },
      });
    } catch (err) {
      next(err);
    }
  },

  getDetailEnrollment: async (req, res, next) => {
    try {
      const enrollmentId = req.params.id;

      if (isNaN(enrollmentId)) {
        return res.status(400).json({
          status: false,
          message: "Invalid enrollmentId provided",
          data: null,
        });
      }

      let enrollment = await prisma.enrollment.findUnique({
        where: { id: Number(enrollmentId) },
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

  updateCourseEnrollment: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { userRating } = req.body;

      if (isNaN(courseId)) {
        return res.status(400).json({
          status: false,
          message: "Invalid courseId provided",
          data: null,
        });
      }

      if (
        userRating !== undefined &&
        (isNaN(userRating) || userRating < 1 || userRating > 5)
      ) {
        return res.status(400).json({
          status: false,
          message:
            "Invalid userRating provided. It must be a number between 1 and 5.",
          data: null,
        });
      }

      let enrollment = await prisma.enrollment.findFirst({
        where: { userId: Number(req.user.id), courseId: Number(courseId) },
        include: { course: true },
      });

      if (!enrollment) {
        return res.status(404).json({
          status: false,
          message: "Enrollment not found",
          data: null,
        });
      }

      let updatedEnrollment = await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { userRating },
      });

      const course = enrollment.course;

      const enrollments = await prisma.enrollment.findMany({
        where: { courseId: course.id, userRating: { not: null } },
      });

      const totalRatings = enrollments.reduce(
        (total, enrollment) => total + (enrollment.userRating || 0),
        0
      );
      const averageRating =
        enrollments.length > 0 ? totalRatings / enrollments.length : 0;

      let updatedCourse = await prisma.course.update({
        where: { id: course.id },
        data: { averageRating },
      });

      return res.status(200).json({
        status: true,
        message: "Enrollment updated successfully",
        data: { updatedEnrollment, updatedCourse },
      });
    } catch (err) {
      next(err);
    }
  },
};
