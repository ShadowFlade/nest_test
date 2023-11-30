'use strict';
const categories = [
    {
        parentCategory:90,
        childCategory: 48
    },
    {
        parentCategory:51,
        childCategory: 77
    },
    {
        parentCategory:34,
        childCategory: 67
    },

    {
        parentCategory:34,
        childCategory: 45
    },

    {
        parentCategory:72,
        childCategory: 65
    },

    {
        parentCategory:72,
        childCategory: 109
    },

    {
        parentCategory:73,
        childCategory: 82
    },
    {
        parentCategory:73,
        childCategory: 131
    },
    {
        parentCategory:46,
        childCategory: 50
    },
    {
        parentCategory:46,
        childCategory: 129
    },

    {
        parentCategory:67,
        childCategory: 128
    },

    {
        parentCategory:112,
        childCategory: 106
    },

    {
        parentCategory:112,
        childCategory: 113
    },

    {
        parentCategory:94,
        childCategory: 28
    },
    {
        parentCategory:94,
        childCategory: 110
    },
    {
        parentCategory:51,
        childCategory: 90
    },
    {
        parentCategory:90,
        childCategory: 48
    },
]
// crates junction table for categories
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        queryInterface.bulkInsert('categories_categoies', categories);
  },

  async down (queryInterface, Sequelize) {
        queryInterface.bulkDelete('categories_categories', categories)
 }
};
