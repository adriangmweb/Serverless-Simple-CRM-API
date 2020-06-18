const { mimeTypes } = require('../../../config')

module.exports = ({ type }) => mimeTypes.includes(type)