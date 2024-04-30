const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const AuthDataValidator = require('../validator/AuthDataValidator');

router.post('/signup', AuthDataValidator.signup, authController.signup);

router.post('/login', AuthDataValidator.login, authController.login);

router.post('/forget_password', AuthDataValidator.forgetPassword, authController.forgetPassword);

router.post('/otp_verification', AuthDataValidator.otpVerification, authController.otpVerification);

router.put('/reset_password', authController.resetPassword);



module.exports = router;