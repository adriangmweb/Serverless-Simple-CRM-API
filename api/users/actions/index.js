const { get, list, create, remove, update } = require('../../../services')
const MODEL_NAME = 'User'

module.exports = {
  create: async (attributes) => create(MODEL_NAME, attributes),
  get: async (userId) => get(MODEL_NAME, userId),
  list: async () => list(MODEL_NAME),
  remove: async (userId) => remove(MODEL_NAME, userId),
  update: async (userId, attributes) => update(MODEL_NAME, userId, attributes)
}
