'use strict';
const { errorReporter } = require('../../helpers')
const { login } = require('./actions')
const {
  comparePassword,
  generatePolicy,
  signToken,
  validateToken,
  isAdminEndpoint
} = require('./helpers')

module.exports.auth = async (event, context, callback) => {
  if (!event.authorizationToken) {
    return callback('Unauthorized')
  }

  try {
    const [prefix, token] = event.authorizationToken.split(' ')
    const { id, isAdmin } = validateToken(token)

    if (isAdminEndpoint(event.methodArn)) {
      const effect = (isAdmin) ? 'Allow' : 'Deny'
      return generatePolicy(id, effect, event.methodArn)
    }

    return generatePolicy(id, 'Allow', event.methodArn)
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
    return errorReporter(error)
  }
}