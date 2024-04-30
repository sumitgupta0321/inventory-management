const userModel = require('../models/user');
const otpModel = require('../models/otp');
const env = require('dotenv');
env.config();
const { STRING_CONSTANTS } = require('../constants/message');
const Enc = require('enc');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

class authService {
//Methode to signup
  async signup(req, res, next) {
    try {
      const findUser = await userModel.findOne({ where: { email: req.body.email } });
      if (findUser) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EXISTING_EMAIL });
      }
      const encryptedPassword = Enc.aes192.encode(req.body.password, process.env.PWD_KEY);
      req.body.password = encryptedPassword;

      await userModel.create(req.body);
      return res.status(200).json({ status: true, message: STRING_CONSTANTS.NEW_USER_ADD });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    }
  }
//Methode to login
  async login(req, res, next) {
    try {
      const encryptedPassword = Enc.aes192.encode(req.body.password, process.env.PWD_KEY);
      req.body.password = encryptedPassword;
      const user = await userModel.findOne({ where: { email: req.body.email, password: req.body.password } });
      if (!user) {
        return res.status(403).json({ status: true, message: STRING_CONSTANTS.INVALID_CREDENTIALS });
      }
      return res.status(200).json({ status: true, message: STRING_CONSTANTS.LOGIN_SUCCESS, data: user });
    } catch (error) {
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    }
  }
  //Methode to forget Password
  async forgetPassword(req, res, next) {
    try {
      const getemail = await userModel.findOne({ where: { email: req.body.email }, raw: true });
      if (!getemail) {
        return res.status(401).json({ status: false, message: STRING_CONSTANTS.EMAIL_NOT_EXISTED });
      } else {
        const yourotp = Date.now().toString().slice(-6);
        await otpModel.update({ otp: yourotp }, { where: { email: getemail.email }, raw: true });

        transporter.sendMail({
          from: 'Inventory Management',
          to: getemail.email,
          subject: 'Your OTP',
          text: `Your OTP is: ${yourotp} and it will expire in 2 minutes`,
        });

        return res.status(200).json({ status: true, message: STRING_CONSTANTS.OTP_SENT });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
//Methode to verify OTP
  async otpVerification(req, res, next) {
    try {
      const getotp = await otpModel.findOne({ where: { email: req.body.email, otp: req.body.otp }, raw: true });
      if (!getotp) {
        return res.status(401).json({ status: false, message: STRING_CONSTANTS.OTP_INVALID });
      } else {
        const currentTime = Date.now();
        const validityTime = 2 * 60 * 1000;
        const updateTime = getotp.updatedAt;
        const timeDifference = currentTime - updateTime;
        const isWithinTime = timeDifference <= validityTime;
        if (isWithinTime) {
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.OTP_VERIFIED });
        } else {
          return res.status(200).json({ status: false, message: STRING_CONSTANTS.OTP_EXPIRED });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    }
  }
//Methode to reset password
  async resetPassword(req, res, next) {
    try {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: false, message: STRING_CONSTANTS.PASSWORD_NOT_MATCH });
      }
      const getemail = await userModel.findOne({ where: { email: req.body.email }, raw: true });
      if (!getemail) {
        return res.status(401).json({ status: false, message: STRING_CONSTANTS.EMAIL_NOT_EXISTED });
      }
      const encryptedPassword = Enc.aes192.encode(req.body.password, process.env.PWD_KEY);
      await userModel.update({ password: encryptedPassword }, { where: { email: getemail.email }, raw: true });

      return res.status(200).json({ status: true, message: STRING_CONSTANTS.PASSWORD_UPDATED });
    } catch (error) {
      return res.status(409).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    }
  }

}
module.exports = new authService();
