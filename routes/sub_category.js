const express = require('express');
const sub_categoryController = require('../controllers/sub_category');
const sub_category_Validator = require('../middleware/validator/category_validator');
const router = express.Router();



router.post('/add_sub_category',sub_category_Validator.sub_category, sub_categoryController.addSubCategory);
router.get('/list_sub_category', sub_categoryController.listSubCategory);
router.get('/list_sub_category_by_id/:category_id', sub_categoryController.listSubCategoryById);
router.put('/update_sub_category/:id', sub_category_Validator.sub_category, sub_categoryController.updateSubCategory);
router.put('/delete_sub_category/:id', sub_categoryController.deleteSubCategory);



module.exports = router;