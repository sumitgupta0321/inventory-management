'use strict';

const sequelize = require('../database');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('tbl_users', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      country_code: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      mobile: {
        type: Sequelize.INTEGER(15),
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      
    })
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_users')
  }
};


