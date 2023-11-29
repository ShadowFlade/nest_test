'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createDatabase('nest');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropDatabase('nest');
  }
};
