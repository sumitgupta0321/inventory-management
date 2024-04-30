const { STRING_CONSTANTS } = require('../constants/message');
class BrandValidator {
   
 brand(req, res, next) {
    try {
      const {brand_name} = req.body;
      if (!brand_name) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.BRAND_NAME_REQUIRE });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
}

module.exports = new BrandValidator();
