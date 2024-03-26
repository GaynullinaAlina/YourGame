'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Themes', [
      {
        themeName: 'Elbrus',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        themeName: 'Java Script',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        themeName: 'Сериалы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        themeName: 'Кот в мешке',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Themes', null);
  },
};
