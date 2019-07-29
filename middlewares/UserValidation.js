const bcrypt = require('bcryptjs');
const checkItem = require('../helpers/checkInput');
const requestHelper = require('../helpers/requestHelper');
const userModel = require('../database/models/model');
require('dotenv').config();

/**
 * Validates all routes
 * @class Validator
 */
module.exports = class userValidation {
  /**
   * Validates all user details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  static async userInput(req, res, next) {
    const { guide, email, password } = req.body;
    const username = req.body.username.trim();
    const userEmail = await userModel.findSingleUser({ email: email });
    const userName = await userModel.findSingleUser({
      username: username
    });
    if (userEmail[0].email || userName[0].username) {
      return requestHelper.error(res, 409, 'User with details already exist');
    }

    const check = checkItem({
      username,
      email,
      password
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await userModel.addUser({
      username,
      email,
      password: hash,
      guide
    });
    // console.log('========', newUser);
    // eslint-disable-next-line require-atomic-updates
    req.newuser = newUser;
    next();
  }
};
