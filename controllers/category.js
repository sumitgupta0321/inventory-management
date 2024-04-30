const categoryService = require('../services/category');

class categoryController{

    async addCategory(req, res, next){
        try {
            await categoryService.addCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async listCategory(req, res, next){
        try {
            await categoryService.listCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async updateCategory(req, res, next){
        try {
            await categoryService.updateCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async deleteCategory(req, res, next){
        try {
            await categoryService.deleteCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
}
module.exports = new categoryController();