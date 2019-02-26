const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    feed: [Post!]!
    drafts: [Post!]!
    users: [User!]!
    post(id: ID!): Post
    loggedInUser: User
  }

  extend type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createDraft(title: String!, content: String!): Post!
    verifyUser(token: String!): AuthPayload!
    publish(id: ID!): Post!
    deletePost(id: ID!): Post!
  }

  extend type Subscription {
    feedSubscription: Post
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    published: Boolean!
    title: String!
    content: String!
    author: User!
  }
`;
