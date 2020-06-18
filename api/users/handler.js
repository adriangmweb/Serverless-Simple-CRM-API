'use strict';
const { errorReporter } = require('../../helpers')
const { get, list, create, remove, update } = require('./actions')

module.exports.get = async (event) => {
  try {
    const { userId = '' } = event.pathParameters
    const user = await get(userId)
    if (!user) {
      return errorReporter({
        statusCode: 404,
        response: 'User not found'
      })
    }
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return errorReporter(error)
  }
};

module.exports.list = async (event) => {
  try {
    const users = await list()
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return errorReporter(error)
  }
};

module.exports.create = async (event) => {
  try {
    const userParams = JSON.parse(event.body)
    const newUser = await create(userParams)

    return {
      statusCode: 200,
      body: JSON.stringify({ newUser })
    }
  } catch (error) {
    return errorReporter(error)
  }
}

module.exports.remove = async (event) => {
  try {
    if (!event.body) return errorReporter({ statusCode: 400, response: 'Request body cannot be empty' })

    const { id: userId = '' } = JSON.parse(event.body)
    const userDeleted = await remove(userId)

    if (!userId || !userDeleted) {
      return errorReporter({
        statusCode: 404,
        response: 'User not found.'
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        userDeleted: 'User deleted successfully'
      })
    }
  } catch (error) {
    return errorReporter(error)
  }
}

module.exports.update = async (event) => {
  try {
    if (!event.body) return errorReporter({ statusCode: 400, response: 'Request body cannot be empty' })

    const { id: userId = '', ...attributes } = JSON.parse(event.body)

    const [userUpdated] = await update(userId, attributes)
    if (!userId || !userUpdated) {
      return errorReporter({
        statusCode: 404,
        response: 'User not found.'
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        userUpdated: 'User successfully updated'
      })
    }
  } catch (error) {
    return errorReporter(error)
  }
}