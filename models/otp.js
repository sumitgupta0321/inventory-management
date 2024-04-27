const Sequelize = require("sequelize");
const sequelize = require("../database");
const otps = sequelize.define("tbl_otps", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      otp: {
        type: Sequelize.INTEGER(6),
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
module.exports = otps;


