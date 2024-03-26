'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Questions', [
      {
        text: 'Через сколько фаз надо пройти чтобы почти в совершенстве знать JS, TS, Redux, React и еще много всего',
        themeId: 1,
        cost: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'За сколько недель обучения теперь можно стать Сеньёром или Сеньёритой?',
        themeId: 1,
        cost: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Где теперь зубочистка Серёги?',
        themeId: 1,
        cost: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Кто больше всех кидается огурцами?',
        themeId: 1,
        cost: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Кто чаще всего говорит "Ну это происходит под капотом, не заморачивайтесь"?',
        themeId: 1,
        cost: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Сколько типов данных?',
        themeId: 2,
        cost: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Что вернёт Array.prototype.findIndex(), если нечего не найдёт?',
        themeId: 2,
        cost: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Сколько циклов есть в JS',
        themeId: 2,
        cost: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Сколько аргументов принимает callback функция в Array.prototype.reduce()',
        themeId: 2,
        cost: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Какая сложность по времени у метода Array.prototype.pop()?',
        themeId: 2,
        cost: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Сколько друзей в сериале "Друзья"?',
        themeId: 3,
        cost: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Какое заболевание является главной темой сериала "Доктор Хаус"?',
        themeId: 3,
        cost: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'В каком сериале очень часто звучит фраза "Дандер Миффлин, это Пэм"?',
        themeId: 3,
        cost: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'О чём было шоу, которое вел Шелдон Купер в сериале "Теория большого взрыва"?',
        themeId: 3,
        cost: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Какое настоящее имя у Сола Гудмана?',
        themeId: 3,
        cost: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Сколько планет в солнечной системе?',
        themeId: 4,
        cost: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'На каком языке говорит больше всего людей на земле?',
        themeId: 4,
        cost: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Сколько рёбер в теле человека?',
        themeId: 4,
        cost: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Как называется Еврейский новый год?',
        themeId: 4,
        cost: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Под каким названием изначально продавалось мороженное "Эскимо" в СССР,',
        themeId: 4,
        cost: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Questions', null);
  },
};
