const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findChapterById = async (chapterId) => {
  return await prisma.chapter.findUnique({
    where: { id: Number(chapterId) },
  });
};

const createLesson = async (req, res, next) => {
  try {
    const { lessonName, videoURL, chapterId } = req.body;

    const chapter = await findChapterById(chapterId);

    if (!chapter) {
      return res.status(404).json({
        status: false,
        message: "Chapter not found",
        data: null,
      });
    }

    const newLesson = await prisma.lesson.create({
      data: { lessonName, videoURL, chapterId },
    });

    res.status(201).json({
      status: true,
      message: "Lesson created successfully",
      data: { newLesson },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLesson,
};
