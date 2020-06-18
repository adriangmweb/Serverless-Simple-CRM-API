'use strict';
const multipart = require('parse-multipart')
const { errorReporter } = require('../../helpers')
const { get, list, create, remove, update } = require('./actions')
const validateImage = require('./helpers/validateImage')
const uploadImage = require('./actions/uploadImage')

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

    const [customerUpdated] = await update(customerId, customerAttributes)

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

module.exports.upload = async (event) => {
  try {
    const { customerId = '' } = event.pathParameters
    const { principalId } = event.requestContext.authorizer

    const customer = await get(customerId)

    if (!customer) {
      return errorReporter({
        statusCode: 404,
        response: 'Customer not found'
      })
    }

    const bodyBuffer = new Buffer(event.body, 'base64')
    const contentTypes = event.headers['Content-Type'] || event.headers['content-type']
    const boundary = multipart.getBoundary(contentTypes)

    const [ photo ] = multipart.Parse(bodyBuffer, boundary)


    if (!validateImage(photo)) {
      return errorReporter({
        statusCode: 400,
        response: 'Please upload a valid file'
      })
    }

    const { data, type } = photo

    const fileExtension = photo.filename.split('.').pop()
    const filePath = `customers/${customerId}/profile.${fileExtension}`
    const { Location: photoUrl } = await uploadImage(data, filePath, type)

    const updatedAttributes = {
      photo: photoUrl,
      updatedBy: principalId
    }

    const [updated] = await update(customerId, updatedAttributes)

    if (!updated) return errorReporter({ statusCode: 400, response: 'Could not update customer.' })

    return {
      statusCode: 200,
      body: JSON.stringify({
        customer: customer.email,
        photoUrl
      })
    }
  } catch (error) {
    return errorReporter(error)
  }
}