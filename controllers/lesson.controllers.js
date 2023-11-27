const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findChapterById = async (chapterId) => {
  return await prisma.chapter.findUnique({
    where: { id: Number(chapterId) },
  });
};

const findLessonById = async (lessonId) => {
  return await prisma.lesson.findUnique({
    where: { id: Number(lessonId) },
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

const getAllLessons = async (req, res, next) => {
  try {
    const lessons = await prisma.lesson.findMany();

    res.status(200).json({
      status: true,
      message: "Get all lessons successful",
      data: { lessons },
    });
  } catch (err) {
    next(err);
  }
};

const getDetailLesson = async (req, res, next) => {
  try {
    const lessonId = req.params.id;

    const lesson = await findLessonById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        status: false,
        message: "Lesson not found",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Get detail lesson successful",
      data: { lesson },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getDetailLesson,
};
