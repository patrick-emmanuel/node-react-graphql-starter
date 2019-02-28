/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyUser
// ====================================================

export interface VerifyUser_verifyUser_user {
  __typename: 'User';
  id: string;
  email: string;
  name: string;
}

export interface VerifyUser_verifyUser {
  __typename: 'AuthPayload';
  token: string;
  user: VerifyUser_verifyUser_user;
}

export interface VerifyUser {
  verifyUser: VerifyUser_verifyUser;
}

export interface VerifyUserVariables {
  token: string;
}
