const { STRING_CONSTANTS } = require('../../constants/message');
const { VALID_EMAIL, VALID_PASSWORD , VALID_OTP} = require('../../constants/regex');
class AuthDataValidator {
   
 signup(req, res, next) {
    try {
      const {name, email, password, mobile, country_code, role } = req.body;
      if (!email) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_REQUIRED });
      }
      if (!VALID_EMAIL.test(email)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_INVALID });
      }
      if(!password){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.PASWORD_REQUIRED });
      }
      if (!VALID_PASSWORD.test(password)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.INVALID_PASSWORD });
      }
      if(!name){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.NAME_REQUIRE });
      }
      if(!country_code){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.COUNTRY_CODE_REQUIRE });
      }
      if(!role){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.ROLE_REQUIRE });
      }
      if(!mobile){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.MOBILE_REQUIRE });
      }
      next();

    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
  login(req, res, next) { 
    try {
      const {email, password} = req.body;
      if (!email) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_REQUIRED });
      }
      if (!VALID_EMAIL.test(email)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_INVALID });
      }
      if(!password){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.PASWORD_REQUIRED });
      }
      if (!VALID_PASSWORD.test(password)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.INVALID_PASSWORD });
      }
      next();
    } catch (error) {
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
  forget_password(req, res, next){
    try {
      const {email} = req.body;
      if (!email) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_REQUIRED });
      }
      if (!VALID_EMAIL.test(email)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_INVALID });
      }
      next();
    } catch (error) {
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
  otp_verification(req, res, next){
    try {
      const {email,  otp} = req.body;
      if (!email) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_REQUIRED });
      }
      if (!VALID_EMAIL.test(email)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_INVALID });
      }
      if (!otp) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.OTP_REQUIRE });
      }
      if (!VALID_OTP.test(otp)) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.OTP_INNCORRECT });
      }
      next();
    } catch (error) {
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
    }
    rest_password(req, res, next){
      try {
        const {email, password, confirmPassword} = req.body;
        if (!email) {
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_REQUIRED });
        }
        if (!VALID_EMAIL.test(email)) {
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_INVALID });
        }
        if(!password){
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.PASWORD_REQUIRED });
        }
        if (!VALID_PASSWORD.test(password)) {
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.INVALID_PASSWORD });
        }
        if(!confirmPassword){
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.CONFIRM_PASWORD_REQUIRED });
        }
        if (!VALID_PASSWORD.test(confirmPassword)) {
          return res.status(200).json({ status: true, message: STRING_CONSTANTS.INVALID_CONFIRM_PASSWORD });
        }
        next();
      } catch (error) {
        return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
      }
      }
}


module.exports = new AuthDataValidator();
