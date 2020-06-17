'use strict';
const { errorReporter } = require('../../helpers')
const { get, list, create, remove, update } = require('./actions')

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

module.exports.create = async (event) => {
  try {
    const { principalId } = event.requestContext.authorizer

    const customerParams = {
      ...JSON.parse(event.body),
      createdBy: principalId,
      updatedBy: principalId
    }

    const newCustomer = await create(customerParams)

    return {
      statusCode: 200,
      body: JSON.stringify({ newCustomer })
    }
  } catch (error) {
    return errorReporter(error)
  }
}

module.exports.remove = async (event) => {
  try {
    if (!event.body) return errorReporter({ statusCode: 400, response: 'Request body cannot be empty' })

    const { id: customerId = '' } = JSON.parse(event.body)
    const customerDeleted = await remove(customerId)

    if (!customerId || !customerDeleted) {
      return errorReporter({
        statusCode: 404,
        response: 'Customer not found.'
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        customerDeleted: 'Customer deleted successfully'
      })
    }
  } catch (error) {
    return errorReporter(error)
  }
}

module.exports.update = async (event) => {
  try {
    if (!event.body) return errorReporter({ statusCode: 400, response: 'Request body cannot be empty' })

    const { principalId } = event.requestContext.authorizer

    const { id: customerId = '', ...attributes } = JSON.parse(event.body)

    const customerAttributes = {
      ...attributes,
      updatedBy: principalId
    }

    const customerUpdated = await update(customerId, customerAttributes)

    if (!customerId || !customerUpdated) {
      return errorReporter({
        statusCode: 404,
        response: 'Customer not found.'
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        customerUpdated: 'Customer successfully updated'
      })
    }
  } catch (error) {
    return errorReporter(error)
  }
}