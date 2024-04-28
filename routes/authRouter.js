const express = require('express');
const {authController} = require('../controllers');
const router = express.Router();
const {AuthDataValidator} = require('../middleware/dataValidator/index');

router.post('/signup', AuthDataValidator.validateSignupUser, authController.signup);

router.post('/login', AuthDataValidator.login, authController.login);

router.post('/forget_password', AuthDataValidator.forgetPassword, authController.forgetPassword);

router.post('/otp_verification', AuthDataValidator.otpVerification, authController.otpVerification);

router.put('/reset_password', authController.resetPassword);



module.exports = router;