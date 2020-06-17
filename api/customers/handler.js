'use strict';
const { errorReporter } = require('../../helpers')
const { get, list } = require('./actions')

module.exports.get = async (event) => {
  try {
    const { customerId = '' } = event.pathParameters
    const customer = await get(customerId)
    if (!customer) {
      return errorReporter({
        statusCode: 404,
        response: 'Customer not found'
      })
    }
    return {
      statusCode: 200,
      body: JSON.stringify(customer),
    };
  } catch (error) {
    return errorReporter(error)
  }
};

module.exports.list = async (event) => {
  try {
    const customers = await list()
    return {
      statusCode: 200,
      body: JSON.stringify(customers),
    };
  } catch (error) {
    return errorReporter(error)
  }
};
