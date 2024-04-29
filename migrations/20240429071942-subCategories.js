'use strict';

const sequelize = require('../database');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('tbl_subCategories', {
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
      
    })
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_subCategories')
  }
};


