const express = require('express');
const {brandController} = require('../controllers');
const router = express.Router();



router.post('/add_brand', brandController.addBrand);
router.get('/list_brand', brandController.listBrand);
router.put('/update_brand/:id', brandController.updateBrand);
router.put('/delete_brand/:id', brandController.deleteBrand);



module.exports = router;