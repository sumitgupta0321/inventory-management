const categoryModel = require('../models/category');
const { STRING_CONSTANTS } = require('../constants/string');




class categoryService {

    //Methode to add category
    async addCategory(req, res, next) {
        try {
            const findCategory = await categoryModel.findOne({ where: { category_name: req.body.category_name } });
            if (findCategory) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_EXIST });
            }
            await categoryModel.create({ category_name: req.body.category_name });

            return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_ADDED });

        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }

    async listCategory(req, res, next) {
        try {
            const listCategories = await categoryModel.findAll({ where: { status: 1 }, order: [['createdAt', 'DESC']], })
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_LIST, data: listCategories });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }

    async updateCategory(req, res, next) {
        try {
            const updateCategory = await categoryModel.update({ category_name: req.body.category_name }, { where: { id: req.params.id } });
            if (updateCategory) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_UPDATE });
            }
            return res.status(403).json({ status: true, message: STRING_CONSTANTS.CATEGORY_NOT_UPDATE });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const findCategory = await categoryModel.findOne({where:{ id: req.params.id}})
            if(findCategory.status==0){
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_ALREADY_DELETE });
            }
            const deleteCategory = await categoryModel.update({ status: 0 }, { where: { id: req.params.id } });
            if (deleteCategory) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_DELETE });
            }
            return res.status(403).json({ status: true, message: STRING_CONSTANTS.CATEGORY_NOT_DELETE });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
}

module.exports = new categoryService();
