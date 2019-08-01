const jwt = require('jsonwebtoken');
const requestHelper = require('../helpers/requestHelper');
require('dotenv').config();

/**
 * Ensures some routes are protected
 * @function
 *
 * @param   {object} req   the server/http(s) request object
 * @param   {object} res  the server/http(s) response object
 * @param   {object} next      the node/express middleware next object
 *
 * @returns {object}
 */
const AuthenticateToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers.authorization;
  // decode token
  if (token) {
    // verifies token and checks if expired or invalid
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        requestHelper.error(res, 401, 'Authentication failed');
      }
      req.decoded = decoded;
      next();
    });
  } else {
    requestHelper.error(res, 403, 'Access denied. You are not logged in');
  }
};

module.exports = AuthenticateToken;
