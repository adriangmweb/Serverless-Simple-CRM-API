const database = require('./database')

module.exports = {
  adminEndpoints: [
    'user',
    'users'
  ],
  bucketName: `${process.env.NODE_ENV}-crm-api-photo-bucket`,
  database: database,
  mimeTypes: [
    'image/jpeg',
    'image/png'
  ],
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  seedsPassword: process.env.SEEDS_PASSWORD || 'customPassword'
}