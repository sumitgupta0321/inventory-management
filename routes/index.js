var express = require('express');
var router = express.Router();
const authRouter = require('./authRouter');


router.use('/auth', authRouter);


module.exports = router;
