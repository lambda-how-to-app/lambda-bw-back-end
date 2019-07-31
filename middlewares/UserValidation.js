const bcrypt = require('bcryptjs');
const checkItem = require('../helpers/checkInput');
const requestHelper = require('../helpers/requestHelper');
const userModel = require('../database/models/model');
require('dotenv').config();

/**
 * Validates all routes
 * @class Validator
 */
module.exports = class UserValidation {
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
    let existingUser;
    if (userEmail[0] !== undefined) {
      existingUser = `email ${email}`;
    }
    if (userName[0] !== undefined) {
      existingUser = `username ${username}`;
    }
    if (existingUser) {
      return requestHelper.error(
        res,
        409,
        `User with ${existingUser} already exist`
      );
    }

    const check = checkItem({
      username,
      email,
      password
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check
      });
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await userModel.addUser({
      username,
      email,
      password: hash,
      guide
    });
    // eslint-disable-next-line require-atomic-updates
    req.newuser = newUser;
    next();
  }

  static async userLogin(req, res, next) {
    const { username, password, email } = req.body;
    try {
      let check;
      if (email) {
        check = await userModel.findSingleUser({ email });
      }
      if (username) {
        check = await userModel.findSingleUser({ username });
      }
      const checkPassword = await bcrypt.compareSync(
        password,
        check[0].password
      );
      if (check[0] && checkPassword) {
        // eslint-disable-next-line require-atomic-updates
        req.checked = check[0];
        next();
      }
      return requestHelper.error(res, 400, 'wrong credentials');
    } catch (err) {
      err;
    }
  }

  /**
   *  @description validate party inputs on create and update operations
   * @memberof UserValidation
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} get error message
   */
  static createProfile(req, res, next) {
    const { fullname, location_id } = req.body;

    const check = checkItem({
      fullname,
      location_id
    });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    return next();
  }

  static locationId(req, res, next) {
    const id = req.params.id;

    const check = checkItem({ id });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    return next();
  }

  static lifehackValidation(req, res, next) {
    const { title } = req.body;

    const check = checkItem({ title });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    return next();
  }
};
