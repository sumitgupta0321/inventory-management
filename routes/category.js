const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();



router.post('/add_category', categoryController.addCategory);
router.get('/list_category', categoryController.listCategory);
router.put('/update_category/:id', categoryController.updateCategory);
router.put('/delete_category/:id', categoryController.deleteCategory);



module.exports = router;