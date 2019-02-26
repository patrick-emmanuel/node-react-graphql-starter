import axios from 'axios';


const API_URL = 'http://localhost:4000/graphql';

export const login = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables,
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
      `,
    },
    token
      ? {
        headers: {
          'Authorization': token,
        },
      }
      : null,
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
    variables,
  });

export const users = async () =>
  axios.post(API_URL, {
    query: `
      {
        users {
          name
          email
        }
      }
    `,
  });

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $email: String!,
        $password: String!,
        $name: String
      ) {
        signup(
          email: $email,
          password: $password
          name: $name
        ) {
          token
        }
      }
    `,
    variables,
  });

export const updateUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($email: String!) {
          updateUser(email: $email) {
            email
          }
        }
      `,
      variables,
    },
    token
      ? {
        headers: {
          'authorization': token,
        },
      }
      : null,
  );

export const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    token
      ? {
        headers: {
          'authorization': token,
        },
      }
      : null,
  );
