const { gql } = require('apollo-server-express');
const userSchema = require('./user');
import roleSchema from './role';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  userSchema,
  roleSchema
];
