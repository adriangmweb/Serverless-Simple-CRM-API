const { adminEndpoints } = require('../../../config')

module.exports = (endpoint) => endpoint.split('/').some(chunk => adminEndpoints.includes(chunk))