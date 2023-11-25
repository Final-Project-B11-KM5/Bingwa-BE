const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getPagination = require("../utils/getPaggination");

module.exports = {
  createCourse: async (req, res, next) => {
    try {
      const { price, isPremium, categoryId, promotionId } = req.body;

      if (!isPremium && price) {
        return res.status(400).json({
          status: false,
          message: "free class price must be 0",
          data: null,
        });
      }

      let category = await prisma.category.findUnique({
        where: { id: Number(categoryId) },
      });

      if (!category) {
        return res.status(404).json({
          status: false,
          message: "Category not found",
          data: null,
        });
      }

      if (promotionId) {
        promotion = await prisma.promotion.findUnique({
          where: { id: Number(promotionId) },
        });

        if (!promotion) {
          return res.status(404).json({
            status: false,
            message: "Promotion not found",
            data: null,
          });
        }
      }

      let newCourse = await prisma.course.create({
        data: {
          ...req.body,
        },
      });

      return res.status(201).json({
        status: true,
        message: "create Kelas successful",
        data: { newCourse },
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
          id: Number(idCourse),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({
        status: true,
        message: "Update Kelas successful",
        data: editCourse,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  deleteCourse: async (req, res, next) => {
    try {
      const { idCourse } = req.params;
      let deleteCourse = await prisma.course.delete({
        where: {
          id: Number(idCourse),
        },
      });
      res.status(200).json({
        status: true,
        message: "delete Kelas successful",
        data: deleteCourse,
      });
    } catch (err) {
      next(err);
    }
  },

  showAllCourse: async (req, res, next) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      console.log(limit);

      const courses = await prisma.course.findMany({
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });

      const { _count } = await prisma.course.aggregate({
        _count: { id: true },
      });

      const paggination = getPagination(req, _count.id, Number(page), Number(limit));

      res.status(200).json({
        status: true,
        message: "Show All Kelas successful",
        data: { paggination, courses },
      });
    } catch (err) {
      next(err);
    }
  },

  detailCourse: async (req, res, next) => {
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
      const detailCourse = await prisma.course.findUnique({
        where: {
          id: Number(idCourse),
        },
      });
      res.status(200).json({
        status: true,
        message: ` Detail Kelas with id:${idCourse} successful`,
        data: detailCourse,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getCourse: async (req, res, next) => {
    try {
      const { search, category, page = 1, pageSize = 10 } = req.query;

      let where = {};
      if (search) {
        where = {
          OR: [{ courseName: { contains: search, mode: "insensitive" } }, { mentor: { contains: search, mode: "insensitive" } }],
        };
      }

      if (category) {
        const decodedCategory = decodeURIComponent(category);
        where = {
          ...where,
          category: {
            categoryName: decodedCategory,
          },
        };
      }
      const skip = (page - 1) * pageSize;

      const courses = await prisma.course.findMany({
        where,
        take: pageSize,
        skip,
        include: {
          category: true,
        },
      });

      res.json(courses);
    } catch (error) {
      next(error);
    }
  },
};
