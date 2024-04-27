const userModel = require('../models/user');
const otpModel = require('../models/otp');
const Enc = require('enc');


class authService {

  async signup(req, res, next) {
    try {
      const findUser = await userModel.findOne({ where: { email: req.body.email } });
      if (findUser) {
        return res.status(200).json({ status: true, message: 'User already registered' });
      }
      const encryptedPassword = Enc.aes192.encode(req.body.password, process.env.PWD_KEY);
      req.body.password = encryptedPassword;

      await userModel.create(req.body);
      return res.status(200).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: 'Internal server error' });
    }
  }

  async login(req, res, next) {
    try {
     const encryptedPassword = Enc.aes192.encode(req.body.password, process.env.PWD_KEY);
      req.body.password = encryptedPassword;
      const user = await userModel.findOne({ where: { email: req.body.email, password: req.body.password } });
      if (!user) {
        return res.status(403).json({ status: true, message: 'inncorrect username or password' });
      }
      return res.status(200).json({ status: true, message: 'login successfully', data: user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: 'Internal server error' });
    }
  }

 
  async  forgetPassword(req, res, next) {
    try {
      const getemail = await userModel.findOne({ where: { email: req.body.email }, raw: true });
      if (!getemail) {
        return res.status(401).json({ status: false, message: 'Email does not exist' });
      } else {

        const yourotp = Date.now().toString().slice(-6);
        
        await otpModel.update({ otp: yourotp }, { where: { email: getemail.email }, raw: true });

        return res.status(200).json({ status: true, message: 'OTP sent successfully' });
      }
    } catch (error) {
      console.log(error);
      return res.status(409).json({ status: false, message: 'Internal server error' });
    }
  }
}
module.exports = new authService();
