const userModel = require('../models/user');
const otpModel = require('../models/otp');
const env = require('dotenv');
env.config();
const jwt = require('jsonwebtoken');
const { STRING_CONSTANTS } = require('../constants/message');
const { getEmailTemplate } = require('../constants/emailtemplate');
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
      const user = await userModel.findOne({ where: { email: req.body.email, password: encryptedPassword } });
      if (!user) {
        return res.status(403).json({ status: true, message: STRING_CONSTANTS.INVALID_CREDENTIALS });
      }
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
      });
      return res.status(200).json({ status: true, message: STRING_CONSTANTS.LOGIN_SUCCESS, data: user, access_token: accessToken });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    }
  }

  async forgetPassword(req, res, next) {
    try {
      const getemail = await userModel.findOne({ where: { email: req.body.email }, raw: true });
      if (!getemail) {
        return res.status(401).json({ status: false, message: STRING_CONSTANTS.EMAIL_NOT_EXISTED });
      } else {
        const yourotp = Date.now().toString().slice(-6);
        const name = getemail.name.toUpperCase();
        // Update OTP in the database
        await otpModel.update({ otp: yourotp }, { where: { email: getemail.email }, raw: true });
        const emailTemplate = getEmailTemplate(yourotp, name);
        // Send email with HTML template
        transporter.sendMail({
          from: 'Inventory Management',
          to: getemail.email,
          subject: 'Your OTP',
          html: emailTemplate,
        });
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.OTP_SENT });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
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
