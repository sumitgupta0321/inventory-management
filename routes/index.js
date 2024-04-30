var express = require('express');
var router = express.Router();
const authRouter = require('./auth');
const brandRouter = require('./brand');
const categoryRouter = require('./category');
const subCategoryRouter = require('./sub_category');


router.use('/auth', authRouter);

router.use('/brand', brandRouter);

router.use('/category', categoryRouter);

router.use('/sub_category', subCategoryRouter)



module.exports = router;
