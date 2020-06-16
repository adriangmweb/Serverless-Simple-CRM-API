const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (error) => {
  const headers = { 'Content-Type': 'text/plain' }

  if (error instanceof UniqueConstraintError) {
    const [record] = Object.values(error.fields)
    return {
      statusCode: 409,
      headers,
      body: `Sorry, ${record} already exists.`
    }
  } else if (error instanceof ValidationError) {
    return {
      statusCode: 400,
      headers,
      body: "Validation Error. The submitted request is invalid."
    }
  } else {
    console.error({error})
    return {
      statusCode: error.statusCode || 500,
      headers,
      body: error.response || 'Internal server error.'
    }
  }
}