'use strict';
const { hashPassword } = require('../../helpers');
const { seedsPassword } = require('../../config');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Michael',
      lastName: 'Scott',
      email: 'michaelscott@crm-api.com',
      password: await hashPassword(seedsPassword),
      isAdmin: true
    },
    {
      name: 'Dwight',
      lastName: 'Schrute',
      email: 'dwight@crm-api.com',
      password: await hashPassword(seedsPassword),
      isAdmin: false
    }
    ], {});
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.bulkDelete('Users', {
        email: 'michaelscott@crm-api.com'
      }, {}),
      queryInterface.bulkDelete('Users', {
        email: 'dwight@crm-api.com'
      }, {})
    ]);
  }
};