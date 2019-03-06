import bcrypt from "bcryptjs";
import { expect } from "chai";
import { prisma } from "../../generated/prisma-client";
import * as userApi from "./fixtures";
import "../helper";

describe("auth", async function() {
  this.timeout(0);
  this.slow(1000);

  const password = await bcrypt.hash("password", 10);
  const userRole = "USER";
  const email = "patrick@email.com";

  const user = await prisma.createUser({
    name: "Patrick",
    email: "email@email.com",
    password
  });

  await prisma.createRole({
    name: userRole
  });

  describe("createUser: User", () => {
    it("should new user", async () => {
      const expectedResult = {
        data: {
          signup: {
            user: {
              email: email
            }
          }
        }
      };
      const { data } = await userApi.signUp({
        email: email,
        name: "Patrick",
        password: "password"
      });

      expect(data).to.eql(expectedResult);
    });

    it("it should fail creating user with invalid role", async () => {
      //delete available roles
      const userRoles = await prisma.user({ email }).userRoles();
      await prisma.deleteUserRole({
        id: userRoles[0].id
      });
      await prisma.deleteRole({ name: userRole });

      const { data } = await userApi.signUp({
        email: "some@email.com",
        name: "Patrick",
        password: "password"
      });

      expect(data.errors[0].message).to.eql("Creating user with role: USER. Role USER does not exist");
    });
  });

  describe("loggedInUser: User", () => {
    it("returns null when no user is signed in", async () => {
      const { data } = await userApi.loggedInUser();

      expect(data.data.loggedInUser).to.be.a("null");
      expect(data.errors[0].message).to.eql("Not authenticated.");
    });

    it("returns loggedInUser when user is signed in", async () => {
      const expectedResult = {
        data: {
          loggedInUser: {
            email: user.email
          }
        }
      };
      const {
        data: {
          data: {
            login: { token }
          }
        }
      } = await userApi.login({
        email: user.email,
        password: "password"
      });

      const { data } = await userApi.loggedInUser(token);

      expect(data).to.eql(expectedResult);
    });
  });

  describe("verifyUser: AuthPayload", () => {
    it("verify user token", async () => {
      const {
        data: {
          data: {
            login: { token }
          }
        }
      } = await userApi.login({
        email: user.email,
        password: "password"
      });
      const expectedResult = {
        data: {
          verifyUser: {
            token: token,
            user: {
              email: user.email
            }
          }
        }
      };
      const { data } = await userApi.verifyUser({ token });

      expect(data).to.eql(expectedResult);
    });
  });
});
