const brandModel = require('../models/brand');
const { STRING_CONSTANTS } = require('../constants/message');


class brandService {

    //Methode to add category
    async addBrand(req, res, next) {
        try {
            const findBrand = await brandModel.findOne({ where: { brand_name: req.body.brand_name } });

            if (findBrand) {
                const lower_brand_name = findBrand.brand_name.toLowerCase();
                const lower_body_brand_name = req.body.brand_name.toLowerCase();
                if (lower_brand_name === lower_body_brand_name) {
                    return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_EXIST });
                }
            }
            await brandModel.create({ brand_name: req.body.brand_name, brand_image: req.body.brand_image });

            return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_ADDED });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }

    async listBrand(req, res, next) {
        try {
            const listbrands = await brandModel.findAll({ where: { status: 1 }, order: [['createdAt', 'DESC']], })
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_LIST, data: listbrands });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
    // async updateBrand(req, res, next) {
    //     try {
    //         const findBrand = await brandModel.findOne({ where: { brand_name: req.body.brand_name } });
    //         console.log(findBrand)
    //         if (findBrand) {
    //             const lower_brand_name = findBrand.brand_name.toLowerCase();
    //             const lower_body_brand_name = req.body.brand_name.toLowerCase();
    //             if (lower_brand_name === lower_body_brand_name) {
    //                 return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_EXIST });
    //             }
    //         }
    //         const updateBrand = await brandModel.update({ brand_name: req.body.brand_name, brand_image: req.body.brand_image }, { where: { id: req.params.id } });
    //         if (updateBrand) {
    //             return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_UPDATE });
    //         }
    //         return res.status(403).json({ status: true, message: STRING_CONSTANTS.BRAND_NOT_UPDATE });
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    //     }
    // }
    async updateBrand(req, res, next) {
        try {
            const findBrand = await brandModel.findOne({ where: { brand_name: req.body.brand_name } });
            if (findBrand.id != req.params.id) {

                if (findBrand) {
                    const lower_brand_name = findBrand.brand_name.toLowerCase();
                    const lower_body_brand_name = req.body.brand_name.toLowerCase();
                    if (lower_brand_name === lower_body_brand_name) {

                        return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_EXIST });
                    }
                }
            }
            const updateBrand = await brandModel.update({ brand_name: req.body.brand_name, brand_image: req.body.brand_image }, { where: { id: req.params.id } });
            if (updateBrand) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_UPDATE });
            }
            return res.status(403).json({ status: true, message: STRING_CONSTANTS.BRAND_NOT_UPDATE });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const findBrand = await brandModel.findOne({ where: { id: req.params.id } })
            if (findBrand.status == 0) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_ALREADY_DELETE });
            }
            const deleteBrand = await brandModel.update({ status: 0 }, { where: { id: req.params.id } });
            if (deleteBrand) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_DELETE });
            }
            return res.status(403).json({ status: true, message: STRING_CONSTANTS.BRAND_NOT_DELETE });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
        }
    }
}

module.exports = new brandService();
