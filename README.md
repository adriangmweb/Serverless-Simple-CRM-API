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
npx run sequelize db:migrate
```

Run seeds to create the first demo users and customers, to be able to start using the API.
```
npx run sequelize db:seed:all
```

Now you should have everything ready to deploy and start using the API.

## Deployment

Prepare dependencies layer and deploy all functions and resources if a given environment, default to `dev`.

```sh
$ npm run deploy {env}
```

_Note: you can also deploy without preparing the layer using **sls-deploy**._
