const categoryModel = require('../models/category');
const subCategoryModel = require('../models/subCategory');

const { STRING_CONSTANTS } = require('../constants/message');




class subCategoryService {

    async addSubCategory(req, res, next) {
        try {
            const findSubCategory = await subCategoryModel.findOne({
                where: {
                    sub_category_name: req.body.sub_category_name, category_id: req.body.category_id
                }
            });
            if (findSubCategory) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_EXIST });
            }
            await subCategoryModel.create({ category_id: req.body.category_id, sub_category_name: req.body.sub_category_name })
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_ADDED });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }

    async listSubCategory(req, res, next) {
        try {
            const listCategories = await subCategoryModel.findAll({
                where: { status: 1 },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: categoryModel,
                        as: 'category',
                        attributes: ['category_name'],
                        required: true
                    },
                ]
            })
      const correctdata = listCategories.map(user => ({
        id: user.id,
        category_id: user.category_id,
        category_name: user.category.category_name,
        sub_category_name: user.sub_category_name,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        
      }));
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_LIST, data: correctdata });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
    
    async listSubCategoryById(req, res, next) {
        try {
            const listCategories = await subCategoryModel.findAll({
                where: { status: 1,
                category_id: req.params.category_id },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: categoryModel,
                        as: 'category',
                        attributes: ['category_name'],
                        required: true
                    },
                ]
            })
      const correctdata = listCategories.map(user => ({
        id: user.id,
        category_id: user.category_id,
        category_name: user.category.category_name,
        sub_category_name: user.sub_category_name,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        
      }));
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_LIST, data: correctdata });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
    async updateSubCategory(req, res, next) {
        try {
            const updateSubCategory = await subCategoryModel.update({ sub_category_name: req.body.sub_category_name, category_id: req.body.category_id}, { where: { id: req.params.id } });
            if (updateSubCategory) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_UPDATE });
            }
            return res.status(403).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_NOT_UPDATE });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
    async deleteSubCategory(req, res, next) {
        try {
            const findSubCategory = await subCategoryModel.findOne({where:{ id: req.params.id}})
            if(findSubCategory.status==0){
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_ALREADY_DELETE });
            }
            const deleteCategory = await subCategoryModel.update({ status: 0 }, { where: { id: req.params.id } });
            if (deleteCategory) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_DELETE });
            }
            return res.status(403).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_NOT_DELETE });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
}
module.exports = new subCategoryService
