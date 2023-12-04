'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productCategoriesSchema = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      productCategory: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    }
    queryInterface.createTable('products_sections', productCategoriesSchema);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('products_sections');
  },
};
