const database = require('./database')

module.exports = {
  database: database,
  seedsPassword: process.env.SEEDS_PASSWORD || 'customPassword'
}