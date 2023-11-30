'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('products_categories');
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('products_categories');
  },
};
