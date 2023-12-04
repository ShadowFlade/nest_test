'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoriesCategoriesSchema = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parentCategory: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      childCategory: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    };
    queryInterface.createTable(
      'categories_categories',
      categoriesCategoriesSchema,
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('categories_categories');
  },
};
