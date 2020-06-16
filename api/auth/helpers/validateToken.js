const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../../config')

module.exports = (token) => jwt.verify(token, jwtSecret)