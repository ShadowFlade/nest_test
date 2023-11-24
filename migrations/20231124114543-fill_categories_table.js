'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        id: 90,
        name: 'Трикотажные юбки',
        slug: 'skirtsTrik',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['48'],
        parentCategory: 51,
      },
      {
        id: 51,
        name: 'Джемпера',
        slug: 'sweaters',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['77', '51'],
      },
      {
        id: 34,
        name: 'Аксессуары',
        slug: 'aksessuary',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['67', '45'],
      },
      {
        id: 72,
        name: 'Сумки',
        slug: 'bags',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['65', '109'],
      },
      {
        id: 73,
        name: 'Ремни',
        slug: 'belt',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['82', '131'],
      },
      {
        id: 46,
        name: 'Блузки',
        slug: 'bluzy',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['50', '129'],
      },
      {
        id: 67,
        name: 'Сертификаты',
        slug: 'gift',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['28'],
      },
      {
        id: 112,
        name: 'Женские белые брюки карго',
        slug: 'belye',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['36', '113'],
      },
      {
        id: 94,
        name: 'Back to school',
        slug: 'skirtsTrik',
        createdAt: Date(),
        updatedAt: Date(),
        subcategories: ['28', '110'],
      },
      {
        id: 48,
        name: 'Корсеты',
        slug: 'korsety',
        createdAt: Date(),
        updatedAt: Date(),
        parentCategory: 90,
      },
    ];

    await queryInterface.bulkInsert('products', products);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
