'use strict';
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
dotenv.config()
const hash =  bcrypt.hashSync(process.env.PASSWORD_SEEDERS, 10)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: 'testtest',
      password:  hash,
      userid: '48549854985',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
