import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    role(where: RoleWhereUniqueInput!): Role!
  }

  extend type Mutation {
    createRole(data: RoleCreateInput!): Role!
  }

  type Role {
    id: ID!
    name: String!
  }

  input RoleCreateInput {
    name: String!
  }

  input RoleWhereUniqueInput {
    id: ID
    name: String
  }
`;
