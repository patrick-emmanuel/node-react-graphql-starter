const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    loggedInUser: User
  }

  extend type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    verifyUser(token: String!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }
`;
