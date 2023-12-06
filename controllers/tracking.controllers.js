const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  updateTracking: async (req, res, next) => {
    try {
      const { idLessons } = req.params;
      const { id } = req.user;
    } catch (err) {
      next(err);
    }
  },
};
