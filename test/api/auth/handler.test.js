const { auth, login } = require('../../../api/auth/handler')

jest.mock('../../../api/auth/helpers/validateToken', () => () => ({
  id: 1,
  isAdmin: true
}));

afterAll(() => jest.resetAllMocks())

describe('auth handler', () => {
  it('should return allow policy effect', async () => {
    const event = {
      authorizationToken: 'token',
      methodArn: '/users'
    }

    const response = await auth(event)
    const [policyStatement] = response.policyDocument.Statement
    expect(policyStatement.Effect).toBe('Allow')
  })
})

jest.mock('../../../api/auth/actions', () => ({ login: () => ({ password: '' }) }));
jest.mock('../../../api/auth/helpers/comparePassword', () => () => true);
jest.mock('../../../api/auth/helpers/signToken', () => () => 'token');

describe('login handler', () => {
  it('should return 200 status code and token', async () => {
    const event = {
      body: JSON.stringify({
        email: 'test@testing.com',
        password: ''
      })
    }

    const response = await login(event)
    expect(response.statusCode).toBe(200)
  })
})

