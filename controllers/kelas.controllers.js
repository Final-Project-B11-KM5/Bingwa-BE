const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createCourse: async (req, res, next) => {
    try {
      let newCourse = await prisma.course.create({
        data: {
          ...req.body,
        },
      });
      return res.status(201).json({
        status: true,
        message: "create Kelas successful",
        data: newCourse,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  editCourse: async (req, res, next) => {
    try {
      const { idCourse } = req.params;
      const checkCourse = await prisma.course.findFirst({
        where: {
          id: Number(idCourse),
        },
      });
      if (!checkCourse) {
        return res.status(404).json({
          status: false,
          message: `Course Not Found With Id ${idCourse}`,
          data: null,
        });
      }
      let editCourse = await prisma.course.update({
        where: {
          id: idCourse,
        },
        data: {
          ...req.body,
        },
      });
      return res.status(201).json({
        status: true,
        message: "create Kelas successful",
        data: editCourse,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const { idCourse } = req.params;
    } catch (err) {
      next(err)
    }
  },
  showAllCourse: async (req, res, next) => {
    try {
    } catch (err) {
      next(err)
    }
  },
  detailCourse: async (req, res, next) => {
    try {
    } catch (err) {
      next(err)
    }
  },
};
