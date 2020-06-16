const { login } = require('../../../services')

module.exports = {
  login: async (email) => login('User', email)
}