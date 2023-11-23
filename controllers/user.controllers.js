const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const { generatedOTP } = require("../utils/otpGenerator");
const nodemailer = require("../utils/nodemailer");

module.exports = {
  register: async (req, res, next) => {
    try {
      let { fullName, email, phoneNumber, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email already exists",
          data: null,
        });
      }

      const otp = generatedOTP();

      let encryptedPassword = await bcrypt.hash(password, 10);
      let newUser = await prisma.user.create({
        data: {
          email,
          password: encryptedPassword,
          otp,
        },
      });

      let newUserProfile = await prisma.userProfile.create({
        data: {
          fullName,
          phoneNumber,
          userId: newUser.id,
        },
      });

      const html = await nodemailer.getHtml("verify-otp.ejs", { email, otp });
      nodemailer.sendEmail(email, "Email Activation", html);

      res.status(201).json({
        status: true,
        message: "Registration successful",
        data: { newUser, newUserProfile },
      });
    } catch (err) {
      next(err);
    }
  },
};
