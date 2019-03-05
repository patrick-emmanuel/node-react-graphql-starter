import axios from "axios";
import { API_URL } from "../helper";

export const login = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables
  });

export const loggedInUser = async token =>
  await axios.post(
    API_URL,
    {
      query: `
        {
          loggedInUser {
            email
          }
        }
      `
    },
    token
      ? {
          headers: {
            Authorization: token
          }
        }
      : null
  );

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          email
        }
      }
    `,
    variables
  });

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $email: String!,
        $password: String!,
        $name: String!
      ) {
        signup(
          email: $email,
          password: $password
          name: $name
        ) {
          user {
            email
          }
        }
      }
    `,
    variables
  });

export const verifyUser = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $token: String!
      ) {
        verifyUser(
          token: $token,
        ) {
          token
          user {
            email
          }
        }
      }
    `,
    variables
  });
