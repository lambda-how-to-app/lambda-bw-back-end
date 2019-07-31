const jwt = require('jsonwebtoken');
const requestHelper = require('./requestHelper');
require('dotenv').config();

const createToken = (res, statusCode, message, result) => {
  const user = {
    userId: result.id,
    userName: `${result.username}`,
    email: `${result.email}`,
    guide: result.guide
  };
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 1440
  });
  const logInfo = {
    ...user,
    token
  };
  return requestHelper.success(res, statusCode, message, logInfo);
};
module.exports = createToken;
