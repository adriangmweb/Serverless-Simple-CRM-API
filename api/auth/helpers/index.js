const comparePassword = require('./comparePassword')
const generatePolicy = require('./generatePolicy')
const isAdminEndpoint = require('./isAdminEndpoint')
const signToken = require('./signToken')
const validateToken = require('./validateToken')

module.exports = {
  comparePassword,
  generatePolicy,
  isAdminEndpoint,
  signToken,
  validateToken
}