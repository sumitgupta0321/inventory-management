const file_service = require('../services/file');

class fileController{

    async uploadFile(req, res, next){
        try {
            await file_service.uploadFile(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
}
module.exports = new fileController();