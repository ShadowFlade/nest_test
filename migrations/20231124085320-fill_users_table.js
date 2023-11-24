'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Vladimir Dugov',
        login: 'test1',
        email: 'test@yandex.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ms. Smith',
        login: 'test2',
        role: 'user',
        email: 'ang@joli.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '',
        login: 'admin',
        role: 'admin',
        email: 'test@yandex.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ms. Smith',
        login: 'test2',
        email: 'ang@joli.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
