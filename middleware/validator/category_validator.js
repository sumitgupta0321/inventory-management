const { STRING_CONSTANTS } = require('../../constants/message');
class CategoryValidator {
   
 category(req, res, next) {
    try {
      const {category_name} = req.body;
      if (!category_name) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_NAME_REQUIRE });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
  sub_category(req, res, next) {
    try {
      const {sub_category_name, category_id} = req.body;
      if (!category_id) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.CATEGORY_NAME_REQUIRE });
      }
      if (!sub_category_name) {
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.SUB_CATEGORY_NAME_REQUIRE });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR});
    }
  }
}


module.exports = new CategoryValidator();
