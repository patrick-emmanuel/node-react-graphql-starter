import gql from 'graphql-tag';
import { TypedMutation } from '../mutations';
import { Login, LoginVariables } from './types/Login';
import { SignUp, SignUpVariables } from './types/SignUp';
import { VerifyUser, VerifyUserVariables } from './types/VerifyUser';

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    name
  }
`;

export const SIGN_UP_MUTATION = gql`
  ${fragmentUser}
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        ...User
      }
    }
  }
`;

export const TypedSignUpMutation = TypedMutation<SignUp, SignUpVariables>(
  SIGN_UP_MUTATION
);

export const LOGIN_MUTATION = gql`
  ${fragmentUser}
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...User
      }
    }
  }
`;

export const TypedLoginMutation = TypedMutation<Login, LoginVariables>(
  LOGIN_MUTATION
);

export const VERIFY_TOKEN_MUTATION = gql`
  ${fragmentUser}
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      token
      user {
        ...User
      }
    }
  }
`;

export const TypedVerifyTokenMutation = TypedMutation<
  VerifyUser,
  VerifyUserVariables
>(VERIFY_TOKEN_MUTATION);
