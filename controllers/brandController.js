const {brandService} = require('../services');

class brandController{

    async addBrand(req, res, next){
        try {
            await brandService.addBrand(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async listBrand(req, res, next){
        try {
            await brandService.listBrand(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async updateBrand(req, res, next){
        try {
            await brandService.updateBrand(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async deleteBrand(req, res, next){
        try {
            await brandService.deleteBrand(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
}
module.exports = new brandController();