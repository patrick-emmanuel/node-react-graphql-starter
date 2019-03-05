import { testServer } from "../index";

export const API_URL = 'http://localhost:4000/graphql';

before(function() {
  testServer;

});

after(() => {
  testServer.close();
})
