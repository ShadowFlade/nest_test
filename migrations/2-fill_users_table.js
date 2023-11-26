'use strict';
const users = [
  {
    name: 'Vladimir Dugov',
    login: 'test1',
    email: 'test@yandex.com',
    role: 'user',
    password:"password",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ms. Smith',
    login: 'test2',
    role: 'user',
    email: 'ang1@joli.com',
    password:"password",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ms. Smith',
    login: 'test3',
    email: 'ang@joli.com',
    password:"password",
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', users);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', users, {});
  }
};
