const {subCategoryService} = require('../services');

class subCategoryController{

    async addSubCategory(req, res, next){
        try {
            await subCategoryService.addSubCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async listSubCategory(req, res, next){
        try {
            await subCategoryService.listSubCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async listSubCategoryById(req, res, next){
        try {
            await subCategoryService.listSubCategoryById(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async updateSubCategory(req, res, next){
        try {
            await subCategoryService.updateSubCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async deleteSubCategory(req, res, next){
        try {
            await subCategoryService.deleteSubCategory(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
}
module.exports = new subCategoryController();