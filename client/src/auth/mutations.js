import gql from "graphql-tag";

export const REGISTER_USER_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const VERIFY_USER_TOKEN = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
