<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Advanced starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>

## Features

- **Scalable GraphQL server:** The server uses [`apollo-server-express`](https://www.apollographql.com/docs/apollo-server/servers/express.html) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on PostgreSQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible [data model](./database/datamodel.graphql) – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

A full-fledged **React, Node and Apollo boilerplate**

## Requirements

```sh
Ensure you have node installed on your machine.
```

## Getting started

```sh
# 1. Clone the repo
git clone https://github.com/the-bionic/node-react-graphql-starter.git my-app && cd my-app
npm install --prefix client && npm install --prefix server 

# 2. Start docker
docker-compose up

# 3. Deploy the prisma service. Learn more [`here`](https:prisma.io)
From the root of the app: npm run --prefix server deploy:dev or cd server && npm run deploy:dev

# 4. View app
App is running on localhost:4000

# 5. Testing

## Server:
To the test the app, deploy prisma test db, and run the tests:
npm run --prefix server deploy:test or cd server && npm run deploy:test
npm run --prefix server test:docker

## Client
npm run --prefix client test:docker

## Documentation

# Commands

Assuming all commands are being run from the project root

# server
* `npm run --prefix server build-types` To generate typescript client types from the graphql server. Ensure the app is running.

# client
* `npm run --prefix client test:docker` To test client
* `npm run --prefix client storybook:docker` To run storybook. Visit localhost:9009 to see it. Learn more about storybook [`here`](https://storybook.js.org/)


