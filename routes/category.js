const express = require('express');
const categoryController = require('../controllers/category');
const category_Validator = require('../middleware/validator/category_validator');
const router = express.Router();



router.post('/add_category', category_Validator.category, categoryController.addCategory);
router.get('/list_category', categoryController.listCategory);
router.put('/update_category/:id', category_Validator.category, categoryController.updateCategory);
router.put('/delete_category/:id', categoryController.deleteCategory);



module.exports = router;