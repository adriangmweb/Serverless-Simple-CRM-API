'use strict';

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert('Customers', [{
        name: 'Bill',
        lastName: 'Gates',
        email: 'billgates@hotmail.com',
        createdBy: 1,
        updatedBy: 1
      },
      {
        name: 'Steve',
        lastName: 'Wozniak',
        email: 'stevewozniak@apple.com',
        createdBy: 2,
        updatedBy: 2
      }
    ], {});
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.bulkDelete('Customers', {
        email: 'billgates@hotmail.com'
      }, {}),
      queryInterface.bulkDelete('Customers', {
        email: 'stevewozniak@apple.com'
      }, {})
    ]);
  }
};
