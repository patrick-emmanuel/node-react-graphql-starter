const jwt = require('jsonwebtoken');

const {
  AuthenticationError,
} = require('apollo-server-express');

function getUserId({ req }) {
  const authorization = req.headers['authorization']
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthenticationError('Not authenticated.')
}


module.exports = {
  getUserId,
}