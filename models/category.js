const Sequelize = require("sequelize");
const sequelize = require("../database");
const categories = sequelize.define("tbl_categories", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true, 
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
});
module.exports = categories;


