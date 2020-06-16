const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpiration } = require('../../../config')

module.exports = ({ id, isAdmin }) => jwt.sign({ id, isAdmin }, jwtSecret, { expiresIn: jwtExpiration })