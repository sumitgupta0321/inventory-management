var express = require('express');
var router = express.Router();
const authRouter = require('./authRouter');
const brandRouter = require('./brandRouter');
const categoryRouter = require('./categoryRouter');
const subCategoryRouter = require('./subCategoryRouter');


router.use('/auth', authRouter);

router.use('/brand', brandRouter);

router.use('/category', categoryRouter);

router.use('/sub_category', subCategoryRouter)



module.exports = router;
