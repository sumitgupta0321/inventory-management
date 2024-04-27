const express = require('express');
const {authController} = require('../controllers');
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/forget_password', authController.forgetPassword);

router.post('/otp_verification', authController.otpVerification);



module.exports = router;