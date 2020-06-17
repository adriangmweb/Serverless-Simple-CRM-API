const { get, list } = require('../../../services')
const MODEL_NAME = 'Customer'

module.exports = {
  get: async (userId) => get(MODEL_NAME, userId),
  list: async () => list(MODEL_NAME),
}
