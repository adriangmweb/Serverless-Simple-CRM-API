const { isAdminEndpoint } = require('../../../../api/auth/helpers')

jest.mock('../../../../config', () => ({
  adminEndpoints: ['test']
}));

afterAll(() => jest.resetAllMocks())

describe('isAdminEndpoint auth helper', () => {

  it('should return true when admin endpoint', () => {

    const result = isAdminEndpoint('/test')
    expect(result).toBe(true)
  })

  it('should return false if not admin endpoint', () => {

    const result = isAdminEndpoint('/users')
    expect(result).toBe(false)
  })

})