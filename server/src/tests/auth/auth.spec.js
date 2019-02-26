import { expect } from 'chai';

import * as userApi from './fixtures';
import { testServer } from '../../index';


describe('auth', function(){
  this.timeout(0);
  this.slow(1000);
  before(function(){
    testServer
  });

  describe('loggedInUser: User', () => {
    it('returns null when no user is signed in', async () => {
      const { data } = await userApi.loggedInUser();

      expect(data.data.loggedInUser).to.be.a('null');
      expect(data.errors[0].message).to.eql("Not authenticated.");
    });

    it('returns loggedInUser when user is signed in', async () => {
      const expectedResult = {
        data: {
          loggedInUser: {
            email: 'alice@prisma.io',
          },
        },
      };
      const {
        data: {
          data: {
            login: { 
              token 
            },
          },
        },
      } = await userApi.login({
        email: 'alice@prisma.io',
        password: 'secret42',
      });

      const { data } = await userApi.loggedInUser(token);

      expect(data).to.eql(expectedResult);
    });
  });

  describe('users: [User!]', () => {
    it('returns a list of users', async () => {
      const expectedResult = {
        data: {
          users: [
            {
              name: 'Alice',
              email: 'alice@prisma.io',
            },
            {
              name: 'Bob',
              email: 'bob@prisma.io',
            },
          ],
        },
      };

      const result = await userApi.users();

      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('verifyUser: AuthPayload', () => {
    it('verify user token', async () => {
      const {
        data: {
          data: {
            login: { 
              token 
            },
          },
        },
      } = await userApi.login({
        email: 'alice@prisma.io',
        password: 'secret42',
      });
      const expectedResult = {
        data: {
          verifyUser: {
            token: token,
            user: {
              email: 'alice@prisma.io',
            }
          },
        },
      };
      const { data } = await userApi.verifyUser({ token });

      expect(data).to.eql(expectedResult);
    });
  });

  after(() => {
    testServer.close();
  })
});
