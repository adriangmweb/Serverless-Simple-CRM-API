'use strict';
const { errorReporter } = require('../../helpers')
const { comparePassword, generatePolicy, signToken, validateToken } = require('./helpers')
const { login } = require('./actions')

module.exports.adminAuth = async (event, context, callback) => {
  if (!event.authorizationToken) {
    return callback('Unauthorized')
  }

  try {
    const [prefix, token] = event.authorizationToken.split(' ')
    const { userId, isAdmin } = validateToken(token)
    if (isAdmin) {
      return generatePolicy(userId, 'Allow', event.methodArn)
    }
    return generatePolicy(userId, 'Deny', event.methodArn)
  } catch (error) {
    return callback('Unauthorized')
  }
}

module.exports.auth = async (event, context, callback) => {
  if (!event.authorizationToken) {
    return callback('Unauthorized')
  }

  try {
    const [prefix, token] = event.authorizationToken.split(' ')
    const { userId } = validateToken(token)
    return generatePolicy(userId, 'Allow', event.methodArn)
  } catch (error) {
    return callback('Unauthorized')
  }
}

module.exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body)

    const loggedUser = await login(email)
    if (loggedUser) {
      const passwordMatches = await comparePassword(password, loggedUser.password)
      if (passwordMatches) {
        const authorizationToken = signToken(loggedUser)
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "You have been sign in.",
            authorizationToken
          })
        }
      }
    }
    return errorReporter({ statusCode: 404, response: 'User not found.' })
  } catch (error) {
    console.log({ error })
    throw error
  }
}