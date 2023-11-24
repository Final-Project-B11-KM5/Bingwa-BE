const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    getCoures: async (req, res, next) => {
        try {
            const { search, category, page = 1, pageSize = 10 } = req.query;

    let where = {};
    if (search) {
      where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { mentor: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    if (category) {
      const decodedCategory = decodeURIComponent(category);
      where = {
        ...where,
        category: {
          name: decodedCategory,
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

    res.json(courses)
        } catch (error) {
            next(error) 
        }
    }
}
