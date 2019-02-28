const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
} = require('apollo-server-express');

const auth = {
  async signup(parent, args, { prisma }) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await prisma.createUser({ ...args, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, context) {
    const user = await context.prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
  verifyUser: async (parent, { token }, context) => {
    console.log(token);
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET)
      const user = await context.prisma.user({ id: userId })
      return {
        token,
        user
      }
    } catch (e) {
      throw new AuthenticationError(
        'Invalid user token',
      );
    }
  },
}

module.exports = { auth }
