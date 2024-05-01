const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const AuthDataValidator = require('../middleware/validator/auth_validator');

router.post('/signup', AuthDataValidator.signup, authController.signup);

router.post('/login', AuthDataValidator.login, authController.login);

router.post('/forget_password', AuthDataValidator.forget_password, authController.forgetPassword);

router.post('/otp_verification', AuthDataValidator.otp_verification, authController.otpVerification);

router.put('/reset_password', AuthDataValidator.rest_password, authController.resetPassword);



module.exports = router;