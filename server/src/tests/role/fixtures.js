import axios from "axios";
import { API_URL } from "../helper";

export const createRole = async variables =>
  axios.post(API_URL, {
    query: `
      mutation($data: RoleCreateInput!) {
        createRole(data: $data) {
          name
        }
      }
    `,
    variables
  });

  export const role = async variables =>
  axios.post(API_URL, {
    query: `
      query($name: String!) {
        role(name: $name) {
          name
        }
      }
    `,
    variables
  });
