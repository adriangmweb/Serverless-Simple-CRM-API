'use strict';
const { errorReporter } = require('../../helpers')
const { comparePassword, signToken } = require('./helpers')
const { login } = require('./actions')

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