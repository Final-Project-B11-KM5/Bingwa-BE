const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getPagination = require("../utils/getPaggination");

module.exports = {
  createVidio: async (req, res, next) => {
    try {
      const { title, link, duration, courseId, chapterId } = req.body;
      if (!title || !link || !duration) {
        return res.status(400).json({
          status: false,
          message: `title ,link ,or duration must be filled`,
          data: null,
        });
      }
      const findCourse = await prisma.course.findFirst({
        where: {
          id: Number(courseId),
        },
      });
      if (!findCourse) {
        return res.status(404).json({
          status: false,
          message: `Course Not Found With Id ${courseId}`,
          data: null,
        });
      }
      let createVidio = await prisma.vidio.create({
        data: {
          title,
          link,
          duration,
          courseId,
          chapterId,
        },
      });
      return res.status(201).json({
        status: true,
        message: "Succes To Create Vidio Course",
        data: createVidio,
      });
    } catch (err) {
      next(err);
    }
  },
  showAllVidio: async (req, res, next) => {
    try {
      const { limit = 2, page = 1 } = req.query;
      // Pagination
      let count = await prisma.vidio.count();
      const paggination = getPagination(
        req,
        count,
        Number(page),
        Number(limit)
      );
      // end Pagination
      const allVidios = await prisma.vidio.findMany({
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        include: {
          Course: {
            select: {
              courseName: true,
            },
          },
          Chapter: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json({
        status: true,
        message: "Succes Show All Vidio",
        data: allVidios,
        paggination,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  detailVidio: async (req, res, next) => {
    try {
      const { idVidio } = req.params;
      const findVidio = await prisma.vidio.findFirst({
        where: {
          id: Number(idVidio),
        },
      });

      if (!findVidio) {
        return res.status(404).json({
          status: false,
          message: `Vidio Not Found With Id ${idVidio}`,
          data: null,
        });
      }

      const vidio = await prisma.vidio.findUnique({
        where: {
          id: Number(idVidio),
        },
        include: {
          Chapter: true,
          Course: true,
        },
      });
      res.status(200).json({
        status: true,
        message: "Succes To Show Vidio ",
        data: vidio,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  editVidio: async (req, res, next) => {
    try {
      const { idVidio } = req.params;
      const { title, link, duration, courseId } = req.body;
      if (!title || !link || !duration) {
        return res.status(400).json({
          status: false,
          message: `title ,link ,or duration must be filled`,
          data: null,
        });
      }
      const findCourse = await prisma.course.findFirst({
        where: {
          id: Number(courseId),
        },
      });
      if (!findCourse) {
        return res.status(404).json({
          status: false,
          message: `Course Not Found With Id ${courseId}`,
          data: null,
        });
      }

      let updateVidio = await prisma.vidio.update({
        where: {
          id: idVidio,
        },
        data: {
          title,
          link,
          duration,
          courseId,
        },
      });
      res.status(200).json({
        status: true,
        message: "succes to Update Vidio",
        data: updateVidio,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteVidio: async (req, res, next) => {
    try {
      const { idVidio } = req.params;
      let deleteVidio = await prisma.vidio.delete({
        where: {
          id: Number(idVidio),
        },
      });
      res.status(200).json({
        status: true,
        message: "succes to Delete Vidio",
        data: deleteVidio,
      });
    } catch (err) {
      next(err);
    }
  },
  searchFilterVidio: async (req, res, next) => { 
    try {
      const { chapter, title, course } = req.query;
      if (chapter || title || course) {
        let filterVidio = await prisma.vidio.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: title || "a",
                  mode: "insensitive",
                },
              },
            ],
            Chapter: {
              OR: [
                {
                  name: {
                    contains: chapter || "a", //adakah solusi lebih clean untuk query filter chapter ?
                    mode: "insensitive",
                  },
                },
              ],
            },
            Course: {
              OR: [
                {
                  courseName: {
                    contains: course || "a",
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        });
        return res.status(200).json({
          status: true,
          message: "Succes Filter Or Search Vidio",
          data: filterVidio,
        });
      }
      res.status(400).json({
        status: false,
        message: "Bad Request",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
