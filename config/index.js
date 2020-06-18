const database = require('./database')

module.exports = {
  adminEndpoints: [
    'user',
    'users'
  ],
  database: database,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  seedsPassword: process.env.SEEDS_PASSWORD || 'customPassword'
}