const {
  create,
  get,
  list,
  remove,
  update
} = require('../../../api/users/handler')


beforeAll(() => console.error = jest.fn())
afterAll(() => jest.resetAllMocks())

jest.mock('../../../api/users/actions', () => ({
  get: (id) => {
    if (id === 1) {
      return {
        userId: 1,
        name: "testUser"
      }
    }
  },
  list: () => ([
    { name: 'testUser' },
    { name: 'testUser2' }
  ]),
  create: () => true,
  remove: () => true,
  update: () => [true]
}));


describe('get user handler', () => {
  it('should return 200 status code and user', async () => {
    const event = {
      pathParameters: {
        userId: 1
      }
    }

    const response = await get(event)
    expect(response.statusCode).toBe(200)
  })
  it('should return 404 user not found error', async () => {
    const event = {
      pathParameters: {
        userId: 2
      }
    }

    const response = await get(event)
    expect(response.statusCode).toBe(404)
  })
})

describe('list user handler', () => {
  it('should return 200 status code and user', async () => {
    const expectedBody = [
      { name: 'testUser' },
      { name: 'testUser2' }
    ]

    const response = await list()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(JSON.stringify(expectedBody))
  })
})

describe('create user handler', () => {
  it('should return 200 status code', async () => {
    const event = {
      requestContext: {
        authorizer: {
          principalId: 1
        }
      },
      body: JSON.stringify({ name: "dummyName" })
    }

    const response = await create(event)
    expect(response.statusCode).toBe(200)
  })
})

describe('remove user handler', () => {
  it('should return 200 status code', async () => {
    const event = {
      body: JSON.stringify({ id: 1 })
    }

    const response = await remove(event)
    expect(response.statusCode).toBe(200)
  })
})

describe('update user handler', () => {
  it('should return 200 status code', async () => {
    const event = {
      requestContext: {
        authorizer: {
          principalId: 1
        }
      },
      body: JSON.stringify({
        id: 1,
        name: "dummyName"
      })
    }

    const response = await update(event)
    expect(response.statusCode).toBe(200)
  })
})
