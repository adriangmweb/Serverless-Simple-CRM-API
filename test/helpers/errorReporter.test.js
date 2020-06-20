const { ValidationError, UniqueConstraintError } = require('sequelize')
const { errorReporter } = require('../../helpers')

beforeAll(() => console.error = jest.fn())
afterAll(() => jest.resetAllMocks())

describe('errorReporter helper', () => {
  const expected = {
    statusCode: 500,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Internal server error.'
  }

  it(('Given an unknown error, should return 500 internal server error'), () => {
    const error = new Error('Test unknown error');

    const result = errorReporter(error)
    expect(result).toEqual(expected)
  })

  it('Given an ORM validation error, should return a 400 error', () => {
    const validationError = new ValidationError('Test sequelize validation error')
    const expectedValidationError = {
      ...expected,
      statusCode: 400,
      body: "Validation Error. The submitted request is invalid."
    }

    const result = errorReporter(validationError)
    expect(result).toEqual(expectedValidationError)
  })

  it('Given an ORM unique constraint error, should return a 409 error', () => {
    const duplicatedValue = 'email'
    const constraintError = new UniqueConstraintError({
      fields: [duplicatedValue],
      message: 'Test sequelize validation error'
    })
    const expectedConstraintError = {
      ...expected,
      statusCode: 409,
      body: `Sorry, ${duplicatedValue} already exists.`
    }

    const result = errorReporter(constraintError)
    expect(result).toEqual(expectedConstraintError)
  })

})