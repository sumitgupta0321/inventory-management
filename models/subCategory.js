const Sequelize = require("sequelize");
const sequelize = require("../database");
const categoryModel = require("../models/category");
const subCategories = sequelize.define("tbl_subCategories", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      sub_category_name: {
        type: Sequelize.STRING(20),
        allowNull: false, 
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
});

subCategories.belongsTo(categoryModel, {
    foreignKey: 'category_id',
    as: 'category'
  });
module.exports = subCategories;


