const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getPagination = require("../utils/getPaggination");

module.exports = {
  createCourse: async (req, res, next) => {
    try {
      const { price, isPremium, categoryId, promotionId, averageRating } = req.body;

      if (averageRating !== undefined) {
        return res.status(400).json({
          status: false,
          message: "averageRating cannot be provided during course creation",
          data: null,
        });
      }

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
      next(err);
    }
  },

  editCourse: async (req, res, next) => {
    try {
      const { idCourse } = req.params;

      const { averageRating } = req.body;

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

      if (averageRating !== undefined) {
        return res.status(400).json({
          status: false,
          message: "averageRating cannot be provided during course creation",
          data: null,
        });
      }

      let editedCourse = await prisma.course.update({
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
        data: { editedCourse },
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCourse: async (req, res, next) => {
    try {
      const { idCourse } = req.params;
      let deletedCourse = await prisma.course.delete({
        where: {
          id: Number(idCourse),
        },
      });
      res.status(200).json({
        status: true,
        message: "delete Kelas successful",
        data: { deletedCourse },
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
      const course = await prisma.course.findUnique({
        where: {
          id: Number(idCourse),
        },
        include: {
          category: {
            select: {
              categoryName: true,
            },
          },
          chapter: {
            select: {
              name: true,
              duration: true,
              lesson: {
                select: {
                  lessonName: true,
                  videoURL: true,
                  createdAt: true,
                },
              },
            },
          },
          enrollment: {
            select: {
              review: {
                select: {
                  userRating: true,
                  userComment: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json({
        status: true,
        message: ` Detail Kelas with id:${idCourse} successful`,
        data: { course },
      });
    } catch (err) {
      next(err);
    }
  },

  getMyCourse: async (req, res, next) => {
    try {
      const { id } = req.user;
      let courseNotEnrol = await prisma.course.findMany({
        where: {
          enrollment: {
            none: {
              userId: {
                equals: Number(id),
              },
            },
          },
        },
        select: {
          id: true,
          courseName: true,
          mentor: true,
          averageRating: true,
          duration: true,
          level: true,
          price: true,
          category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          _count: {
            select: {
              chapter: true,
            },
          },
        },
      });

      let courseEnrol = await prisma.course.findMany({
        where: {
          enrollment: {
            some: {
              userId: {
                equals: Number(id),
              },
            },
          },
        },
        select: {
          id: true,
          courseName: true,
          mentor: true,
          averageRating: true,
          duration: true,
          level: true,
          price: true,
          category: {
            select: {
              id: true,
              categoryName: true,
            },
          },
          enrollment: {
            select: {
              id: true,
              progres: true,
            },
          },
          _count: {
            select: {
              chapter: true,
            },
          },
        },
      });

      // Modify object property count to modul
      courseEnrol = courseEnrol.map((val) => {
        val["modul"] = val._count.chapter;
        delete val["_count"];
        return val;
      });
      courseNotEnrol = courseNotEnrol.map((val) => {
        val["modul"] = val._count.chapter;
        delete val["_count"];
        return val;
      });
      res.json({
        status: true,
        message: "Success",
        data: { enrol: courseEnrol, notEnroll: courseNotEnrol },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getCourse: async (req, res, next) => {
    try {
      const { search, filter, category, level, page = 1, limit = 10 } = req.query;

      const { _count } = await prisma.course.aggregate({
        _count: { id: true },
      });

      const pagination = getPagination(req, _count.id, Number(page), Number(limit));

      let coursesQuery = {
        where: {},
      };

      if (search) {
        coursesQuery.where.OR = [{ courseName: { contains: search, mode: "insensitive" } }, { mentor: { contains: search, mode: "insensitive" } }];
      }

      if (filter) {
        coursesQuery.orderBy = [];
        if (filter.includes("newest")) {
          coursesQuery.orderBy.push({ createdAt: "desc" });
        }
        if (filter.includes("populer")) {
          coursesQuery.orderBy.push({ averageRating: "desc" });
        }
        if (filter.includes("promo")) {
          coursesQuery.where.promotionId = { not: null };
        }
      }

      if (category) {
        const categories = Array.isArray(category) ? category.map((c) => c.toLowerCase()) : [category.toLowerCase()];
        coursesQuery.where.category = {
          categoryName: { in: categories, mode: "insensitive" },
        };
      }

      if (level) {
        const levels = Array.isArray(level) ? level : [level];
        coursesQuery.where.level = { in: levels };
      }

      let courses = await prisma.course.findMany({
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        where: coursesQuery.where,
        orderBy: coursesQuery.orderBy,
        include: {
          promotion: {
            select: {
              discount: true,
              startDate: true,
              endDate: true,
            },
          },
          category: {
            select: {
              categoryName: true,
            },
          },
          _count: {
            select: {
              chapter: true,
            },
          },
        },
      });

      // Modify object property count to modul
      courses = courses.map((val) => {
        val["modul"] = val._count.chapter;
        delete val["_count"];
        return val;
      });

      const totalReviews = await prisma.review.aggregate({
        _count: true,
      });

      return res.status(200).json({
        status: true,
        message: "Courses retrieved successfully",
        data: { pagination, courses, totalReviews: totalReviews._count },
      });
    } catch (err) {
      next(err);
    }
  },
};
