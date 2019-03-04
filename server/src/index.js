require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { prisma } = require('./generated/prisma-client');
import resolvers from './resolvers'
import typeDefs from './schema'

const app = express();

app.use(cors());
app.use(morgan('dev'));
const isProduction = process.env.NODE_ENV === 'production'

const server = new ApolloServer({
  introspection: true,
  playground: !isProduction,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      req,
      prisma,
    };
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

const testServer = httpServer
export {
  testServer
}

httpServer.listen({ port }, () => {
  console.log(`🚀 Apollo Server on http://localhost:${port}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
});
