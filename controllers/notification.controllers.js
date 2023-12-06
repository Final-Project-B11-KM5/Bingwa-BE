const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createNotification: async (req, res, next) => {
    try {
      const { title, message } = req.body;

      const allUsers = await prisma.user.findMany();

      const newNotification = await Promise.all(
        allUsers.map(async (user) => {
          return prisma.notification.create({
            data: {
              title,
              message,
              userId: user.id,
            },
            include: {
              user: {
                select: {
                  userProfile: {
                    select: {
                      fullName: true,
                    },
                  },
                },
              },
            },
          });
        })
      );

      res.status(201).json({
        status: true,
        message: "Notifications created for all users",
        data: { newNotification },
      });
    } catch (err) {
      next(err);
    }
  },
};
