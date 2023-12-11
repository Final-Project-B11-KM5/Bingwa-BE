const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createNotification: async (req, res, next) => {
    try {
      const { userId, title, message } = req.body;
      const newNotification = await prisma.notification.create({
        data: {
          title,
          message,
          isRead: false,
          createdAt: new Date(),
          userId,
        },
      });

      res.status(201).json({
        status: true,
        message: "Notification created successfully",
        data: { newNotification },
      });
    } catch (err) {
      next(err);
    }
  },

  //membaca notifikasi
  markNotification: async (notificationId) => {
    try {
      const markNotifications = await prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          isRead: true,
        },
      });
      res.status(201).json({
        status: true,
        message: "Notification has been seen",
        data: { markNotifications },
      });
    } catch (err) {
      next(err);
    }
  },
};
