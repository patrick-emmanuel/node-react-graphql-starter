import { ApolloError } from "apollo-server-core";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const auth = {
  async signup(parent, args, { prisma }) {
    const roleName = "USER";
    const password = await bcrypt.hash(args.password, 10);
    const user = await prisma.createUser({ ...args, password });
    const role = await prisma.role({ name: roleName });
    if (!role) {
      await prisma.deleteUser({ email: user.email });
      return new ApolloError(
        `Creating user with role: ${roleName}. Role ${roleName} does not exist`
      );
    }
    await prisma.createUserRole({
      user: {
        connect: {
          email: user.email
        }
      },
      role: {
        connect: {
          id: role.id
        }
      }
    });
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  },

  async login(parent, { email, password }, context) {
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new Error("Invalid password");
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  },
  verifyUser: async (parent, { token }, context) => {
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      const user = await context.prisma.user({ id: userId });
      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError("Invalid user token");
    }
  }
};

export default auth;
