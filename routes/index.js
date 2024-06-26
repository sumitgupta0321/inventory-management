var express = require('express');
var router = express.Router();
const validateToken = require('../middleware/validateToken');
const authRouter = require('./auth');
const brandRouter = require('./brand');
const categoryRouter = require('./category');
const subCategoryRouter = require('./sub_category');
const fileRouter = require('./file');


router.use('/auth', authRouter);

router.use('/brand', validateToken.validateJwt, brandRouter);

router.use('/category', validateToken.validateJwt, categoryRouter);

router.use('/sub_category', validateToken.validateJwt, subCategoryRouter);

router.use('/file', fileRouter)



module.exports = router;
