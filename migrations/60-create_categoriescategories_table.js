'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        queryInterface.createTable('categories_categories');
 },

  async down (queryInterface, Sequelize) {
        queryInterface.dropTable('categories_categories');
 }
};
