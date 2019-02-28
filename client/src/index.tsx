import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';

import { getAuthToken } from './auth/utils';
import { removeAuthToken } from './auth/utils';
import App from './App';
import 'tachyons';
import './index.css';

const httpLink = new HttpLink({ uri: 'http://localhost:2015/api/graphql' });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:2015/api/graphql`,
  options: {
    reconnect: false,
    connectionParams: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  }
});

const middlewareLink = new ApolloLink((operation, forward) => {
  const tokenValue = getAuthToken();
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : ''
    }
  });
  return forward ? forward(operation) : null;
});

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkAuth
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);

      if (message === 'NOT_AUTHENTICATED') {
        removeAuthToken();
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.name === 'Unauthorized') {
      removeAuthToken();
    }
  }
});

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
