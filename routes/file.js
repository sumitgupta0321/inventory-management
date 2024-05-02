const express = require('express');
const file_controller = require('../controllers/file');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload({
    useTempFiles: true
}));

router.post('/upload_file', file_controller.uploadFile);



module.exports = router;