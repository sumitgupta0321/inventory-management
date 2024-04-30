const Sequelize = require("sequelize");
const sequelize = require("../database");
const brands = sequelize.define("tbl_brands", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      brand_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true, 
      },
      brand_image: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
});
module.exports = brands;


