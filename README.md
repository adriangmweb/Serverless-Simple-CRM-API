# Serverless Simple CRM API
A simple CRM Serverless API created with NodeJS, Serverless framework and stored in AWS.

## Installation

Install all dependencies.

```sh
$ npm install
```
### Set up API

Copy the `env.sample` filte content into an `.env` in the root of the project, and fill it with your AWS profile, MySQL Database credentials and custom environemnt variables.

In order to use a AWS profile you should have the aws cli installed and configured. You can follow this [instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) in case you need to set it up.

### Prepare Database

To be able to use the API with your dabatase, you need to have the CRM structure. Using sequelize it is easy to achieve running the following commands.

Run migrations to create tables structure and relations
```
npx sequelize db:migrate
```

Run seeds to create the first demo users and customers, to be able to start using the API.
```
npx sequelize db:seed:all
```

Now you should have everything ready to deploy and start using the API.

## Deployment

Prepare dependencies layer and deploy all functions and resources if a given environment, default to `dev`.

```sh
$ npm run deploy {env}
```

_Note: you can also deploy without preparing the layer using **sls-deploy**._

## Endpoints

### Authentication

In order to access some endpoints you must be authenticated, and provide a Bearer token.

_Token expires in 1h by default_
#### Login
Request
```
POST /login
```
Body
```
{
  "email": "michaelscott@crm-api.com",
  "password": "your password here"
}
```
Response
```
{
  "message": "You have been sign in.",
  "authorizationToken": "eyJhbGci..."
}
```

### Users

Only **Admins** can access to the `/users` endpoint by default. Use a bearer token after login as admin.

#### Get all users
Request
```
GET /users
```
Response
```
[
  {
    "id": 1,
    "name": "Michael",
    "lastName": "Scott",
    "email": "michaelscott@crm-api.com",
    "isAdmin": true,
    "createdAt": "2020-06-14T17:20:17.000Z",
    "updatedAt": "2020-06-16T12:18:25.000Z"
  },
  {
    "id": 2,
    "name": "Dwight",
    "lastName": "Schrute",
    "email": "dwight@crm-api.com",
    "isAdmin": false,
    "createdAt": "2020-06-14T17:20:17.000Z",
    "updatedAt": "2020-06-14T17:20:17.000Z"
  }
]
```

#### Get a single user
Request
```
GET /users/{id}
```
Response
```
{
  "id": 2,
  "name": "Dwight",
  "lastName": "Schrute",
  "email": "dwight@crm-api.com",
  "isAdmin": false,
  "createdAt": "2020-06-14T17:20:17.000Z",
  "updatedAt": "2020-06-14T17:20:17.000Z"
}
```

#### Create a user
Request
```
GET /users/create
```
Body
```
{
  "name": "Jim",
  "lastName": "Halpert",
  "email": "jimhalpert@crm-api.com",
  "password": "your password here"
}
```
Response
```
{
  "newUser": {
    "isAdmin": false,
    "id": 20,
    "name": "Jim",
    "lastName": "Halpert",
    "email": "jimhalpert@crm-api.com",
    "password": "$2a$10$1Fc6U5O3LKM4Bku0k/RKs.XsAEZFQ983IHocmFNTYkbJsHtIgn40O",
    "updatedAt": "2020-06-18T16:26:37.630Z",
    "createdAt": "2020-06-18T16:26:37.630Z"
  }
}
```

#### Update a user
Request
```
GET /users/update
```
Body
```
{
  "id": 3,
  "name": "James",
  "isAdmin": true
}
```
Response
```
{
  "userUpdated": "User successfully updated"
}
```

#### Remove a user
Request
```
GET /users/remove
```
Body
```
{
  "id": 3
}
```
Response
```
{
  "userDeleted": "User deleted successfully"
}
```

### Customers

You must be a signed in user to be able to operate in the `/customers` endpoint. Use a bearer token after login.

Customers includes the same endpoints as Users, except for the one below.

#### Upload customer photo
Request
```
POST /customers/{customerId}/upload
```
Body

Only accepts `form/multipart` with a `jpeg` or `png` image by default.

Response
```
{
  "customer": "stevewozniak@apple.com",
  "photoUrl": "https://{your-bucket-url}/customers/{customer-id}/profile.jpg"
}
```