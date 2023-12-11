const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  updateTracking: async (req, res, next) => {
    try {
      const lessonId = req.params.lessonId;

      if (isNaN(lessonId) || lessonId <= 0) {
        return res.status(400).json({
          status: false,
          message: "Invalid lessonId parameter",
          data: null,
        });
      }

      const lesson = await prisma.lesson.findUnique({
        where: { id: Number(lessonId) },
      });

      if (!lesson) {
        return res.status(404).json({
          status: false,
          message: "Lesson not found",
          data: null,
        });
      }

      // find id traking lesson
      const trackingId = await prisma.tracking.findFirst({
        where: {
          lessonId: Number(lessonId),
          userId: Number(req.user.id),
        },
        select: {
          id: true,
        },
      });
      const tracking = await prisma.tracking.update({
        where: {
          id: trackingId.id,
        },
        data: {
          status: true,
        },
      });

      // update progres course
      let courseId = tracking.courseId;
      let lessonLenght;
      let lessonTrue = 0;
      let newProgres;
      const lessonUser = await prisma.tracking.findMany({
        where: {
          userId: Number(req.user.id),
          courseId: Number(courseId),
        },
      });

      lessonLenght = lessonUser.length;
      lessonUser.forEach((val) => {
        if (val.status == true) {
          lessonTrue++;
        }
      });
      newProgres = (100 / lessonLenght) * lessonTrue;

      // find enrollment id
      const enrolId = await prisma.enrollment.findFirst({
        where: {
          userId: Number(req.user.id),
          courseId: Number(courseId),
        },
        select: {
          id: true,
        },
      });
      const data = await prisma.enrollment.update({
        where: {
          id: enrolId.id,
        },
        data: {
          progres: newProgres.toFixed(1),
        },
      });
      // end update progres

      res.status(200).json({
        status: true,
        message: "Tracking updated successfully",
        data: { tracking },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
