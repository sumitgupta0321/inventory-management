const express = require('express');
const brandController = require('../controllers/brand');
const validateToken = require('../middleware/validateToken');
const brand_Validator = require('../middleware/validator/brand_validator');
const router = express.Router();



router.post('/add_brand', brand_Validator.brand, brandController.addBrand);
router.get('/list_brand', brandController.listBrand);
router.put('/update_brand/:id', brand_Validator.brand, brandController.updateBrand);
router.put('/delete_brand/:id', brandController.deleteBrand);



module.exports = router;