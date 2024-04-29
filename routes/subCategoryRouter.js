const express = require('express');
const {subCategoryController} = require('../controllers');
const router = express.Router();



router.post('/add_sub_category', subCategoryController.addSubCategory);
router.get('/list_sub_category', subCategoryController.listSubCategory);
router.get('/list_sub_category_by_id/:category_id', subCategoryController.listSubCategoryById);
router.put('/update_sub_category/:id', subCategoryController.updateSubCategory);
router.put('/delete_sub_category/:id', subCategoryController.deleteSubCategory);



module.exports = router;