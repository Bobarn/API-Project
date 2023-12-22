'use strict';

/** @type {import('sequelize-cli').Migration} */

const { EventImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await EventImage.bulkCreate([
    {
      eventId: 1,
      url: 'https://picsum.photos/200',
      preview: true
    },
    {
      eventId: 2,
      url: 'https://i.imgur.com/CHE6ilh.jpg',
      preview: true
    },
    {
      eventId: 3,
      url: 'https://picsum.photos/200',
      preview: true
    },
    {
      eventId: 4,
      url: 'https://i.imgur.com/CHE6ilh.jpg',
      preview: true
    },
    {
      eventId: 4,
      url: 'https://i.imgur.com/CHE6ilh.jpg',
      preview: false
    },
    {
      eventId: 5,
      url: 'https://vercel.com/new/templates',
      preview: false
    },
    {
      eventId: 5,
      url: 'https://picsum.photos/200',
      preview: true
    },
    {
      eventId: 6,
      url: 'https://i.imgur.com/CHE6ilh.jpg',
      preview: true
    },
    {
      eventId: 7,
      url: 'https://picsum.photos/200',
      preview: true
    },
    {
      eventId: 8,
      url: 'https://picsum.photos/200',
      preview: true
    },
    {
      eventId: 8,
      url: 'https://i.imgur.com/CHE6ilh.jpg',
      preview: false
    },
    {
      eventId: 2,
      url: 'https://picsum.photos/200',
      preview: false
    }
   ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'EventImages';

    const Op = Sequelize.Op;

    return await queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://vercel.com/new/templates', 'https://i.imgur.com/CHE6ilh.jpg', 'https://example.com/']
      }
    }, {})
  }
};
