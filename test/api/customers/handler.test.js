const {
  create,
  get,
  list,
  remove,
  update,
  upload
} = require('../../../api/customers/handler')


beforeAll(() => console.error = jest.fn())
afterAll(() => jest.resetAllMocks())

jest.mock('../../../api/customers/actions', () => ({
  get: (id) => {
    if (id === 1) {
      return {
        customerId: 1,
        name: "testCustomer"
      }
    }
  },
  list: () => ([
    { name: 'testCustomer' },
    { name: 'testCustomer2' }
  ]),
  create: () => true,
  remove: () => true,
  update: () => [true]
}));


describe('get customer handler', () => {
  it('should return 200 status code and customer', async () => {
    const event = {
      pathParameters: {
        customerId: 1
      }
    }

    const response = await get(event)
    expect(response.statusCode).toBe(200)
  })
  it('should return 404 customer not found error', async () => {
    const event = {
      pathParameters: {
        customerId: 2
      }
    }

    const response = await get(event)
    expect(response.statusCode).toBe(404)
  })
})

describe('list customer handler', () => {
  it('should return 200 status code and customer', async () => {
    const expectedBody = [
      { name: 'testCustomer' },
      { name: 'testCustomer2' }
    ]

    const response = await list()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(JSON.stringify(expectedBody))
  })
})

describe('create customer handler', () => {
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

describe('remove customer handler', () => {
  it('should return 200 status code', async () => {
    const event = {
      body: JSON.stringify({ id: 1 })
    }

    const response = await remove(event)
    expect(response.statusCode).toBe(200)
  })
})

describe('update customer handler', () => {
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

jest.mock('parse-multipart', () => ({
  getBoundary: () => '',
  Parse: () => [{
    data: 'photoStream',
    filename: 'photo.jpg',
    type: 'image/jpeg'
  }]
}))

jest.mock('../../../api/customers/actions/uploadImage', () => ( () => ({ Location: 'url' }) ));

describe('upload customer handler', () => {
  it('should return 200 status code', async () => {
    const event = {
      requestContext: {
        authorizer: {
          principalId: 1
        }
      },
      pathParameters: {
        customerId: 1
      },
      headers: {
        ['content-type']: ''
      },
      body: 'form buffer'
    }

    const response = await upload(event)
    expect(response.statusCode).toBe(200)
  })
})
