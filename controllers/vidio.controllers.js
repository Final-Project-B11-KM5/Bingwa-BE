const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createVidio: async (req, res, next) => {
    try {
      const { vidioName, link, duration, courseId } = req.body;
      if (!vidioName || !link || !duration) {
        return res.status(400).json({
          status: false,
          message: `vidioName ,link ,or duration must be filled`,
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
          vidioName,
          link,
          duration,
          courseId,
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
      // create Pagination
      const { page = 1, pageSize = 10 } = req.query;
      let pages = Number(page);
      let pageSizes = Number(pageSize);
      let link = {};
      let path =
        `${req.protocol}://${req.get("host")}` + req.baseUrl + req.path;
      let count = await prisma.vidio.count();
      if (count - pageSizes * pages <= 0) {
        link.next = "";
        if (pages - 1 <= 0) {
          link.prev = "";
        } else {
          link.prev = `${path}?page=${pages - 1}&pageSize=${pageSizes}`;
        }
      } else {
        link.next = `${path}?page=${pages + 1}&pageSize=${pageSizes}`;
        if (pages - 1 <= 0) {
          link.prev = "";
        } else {
          link.prev = `${path}?page=${pages - 1}&pageSize=${pageSizes}`;
        }
      }
      const skip = (pages - 1) * pageSizes;
      // end create Pagination
      const allVidios = await prisma.vidio.findMany({
        take: pageSizes,
        skip,
        include: {
          Course: {
            select: {
              courseName: true,
            },
          },
        },
      });
      res.status(200).json({
        status: true,
        message: "Succes Show All Vidio",
        data: allVidios,
        link,
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
      });
      res.status(200).json({
        status: true,
        message: "Succes To Show Vidio ",
        data: vidio,
      });
    } catch (err) {
      next(err);
    }
  },
  editVidio: async (req, res, next) => {
    try {
      const { idVidio } = req.params;
      const { vidioName, link, duration, courseId } = req.body;
      if (!vidioName || !link || !duration) {
        return res.status(400).json({
          status: false,
          message: `vidioName ,link ,or duration must be filled`,
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
          vidioName,
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
};
