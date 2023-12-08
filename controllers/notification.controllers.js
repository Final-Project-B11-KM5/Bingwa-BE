const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllNotifications: async (req, res, next) => {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId: Number(req.user.id) },
      });

      res.status(200).json({
        status: true,
        message: "Notifications retrieved successfully",
        data: { notifications },
      });
    } catch (err) {
      next(err);
    }
  },

  createNotification: async (req, res, next) => {
    try {
      const { title, message } = req.body;

      if (!title || !message) {
        return res.status(400).json({
          status: false,
          message: "Title and message are required fields",
        });
      }

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

  markNotificationsAsRead: async (req, res, next) => {
    try {
      const notifications = await prisma.notification.updateMany({
        where: { userId: Number(req.user.id) },
        data: {
          isRead: true,
        },
      });

      res.status(200).json({
        status: true,
        message: "Notifications marked as read for the user",
        data: { notifications },
      });
    } catch (err) {
      next(err);
    }
  },
};
