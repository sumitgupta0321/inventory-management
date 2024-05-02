const { STRING_CONSTANTS } = require('../constants/message');
const env = require('dotenv');
env.config();
const fs = require('fs');

class fileService {

  // async uploadFile(req, res, next) {
  //   try {
  //     if (!req.files || !req.files.file) {
  //       return res.status(400).json({ status: false, message: 'File not provided' });
  //     }
      
  //     const imageFile = req.files.file;

  //     const destinationPath = `${process.env.FILE_PATH}/public/upload/brand_images/${Date.now()}_${imageFile.name}`;

  //     console.log(destinationPath)
  //     await imageFile.mv(destinationPath);

  //     return res.status(200).json({ status: true, message: 'File uploaded successfully', data: destinationPath });
  //   } catch (error) {
  //     console.error("Internal server error:", error);
  //     return res.status(500).json({ status: false, message: 'Internal server error' });
  //   }
  // }
  async uploadFile(req, res, next) {
    try {
      if (!req.files || !req.files.file || !req.body.type) {
        return res.status(400).json({ status: false, message: 'File or type not provided' });
      }
      
      const imageFile = req.files.file;
      const uploadType = req.body.type;
         
      if(uploadType === 'category') {
        const destinationPath = `${process.env.FILE_PATH}/public/upload/category_images/${Date.now()}_${imageFile.name}`;
        await imageFile.mv(destinationPath);

        return res.status(200).json({ status: true, message: 'File uploaded successfully', data: destinationPath });
      } else if(uploadType === 'brand') {

        const destinationPath = `${process.env.FILE_PATH}/public/upload/brand_images/${Date.now()}_${imageFile.name}`;

        await imageFile.mv(destinationPath);

        return res.status(200).json({ status: true, message: 'File uploaded successfully', data: destinationPath });
      } else {
        return res.status(400).json({ status: false, message: 'Invalid upload type' });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: STRING_CONSTANTS.INTERNAL_ERROR });
    }
  }
}

module.exports = new fileService();
