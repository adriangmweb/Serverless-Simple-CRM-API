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

Deploying all functions including resources

```sh
$ npm run deploy {env}
```