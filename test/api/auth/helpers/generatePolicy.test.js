const { generatePolicy } = require('../../../../api/auth/helpers')

describe('generatePolicy auth helper', () => {
  const principalId = 1
  const effect = 'Allow'
  const resource = 'arn-aws-resource'

  it('should return expected policy', () => {

    const expected = {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }]
      }
    }

    const result = generatePolicy(principalId, effect, resource)
    expect(result).toEqual(expected)
  })

  it('should return null if not resource present', () => {

    const result = generatePolicy(principalId, effect)
    expect(result).toBe(null)
  })

})