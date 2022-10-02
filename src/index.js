const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const constants = require('./constants.js');
const { resolvers } = require('./resolvers.js');
const { GRAPHQL_PORT } = constants;
const app = express();
const typeDefs = fs.readFileSync(
  path.join(__dirname, './schema.graphql'),
  'utf-8'
);

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: GRAPHQL_PORT }, () => {
    console.log(
      `✅ GraphQL endpoint: http://localhost:${GRAPHQL_PORT}/graphql`
    );
  });
});
