/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signup_user {
  __typename: 'User';
  id: string;
  email: string;
  name: string;
}

export interface SignUp_signup {
  __typename: 'AuthPayload';
  token: string;
  user: SignUp_signup_user;
}

export interface SignUp {
  signup: SignUp_signup;
}

export interface SignUpVariables {
  email: string;
  password: string;
  name: string;
}
