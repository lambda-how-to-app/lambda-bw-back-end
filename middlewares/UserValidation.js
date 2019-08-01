const bcrypt = require('bcryptjs');
const checkItem = require('../helpers/checkInput');
const requestHelper = require('../helpers/requestHelper');
const userModel = require('../database/models/model');
const hackModel = require('../database/models/lifeHackModel');
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
    const { guide, email, password, fullname, profileimage } = req.body;
    const username = req.body.username.trim();

    const check = checkItem({
      username,
      email,
      password,
      fullname
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check
      });
    }
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

    const hash = await bcrypt.hash(password, 12);
    const newUser = await userModel.addUser({
      username,
      email,
      password: hash,
      fullname,
      profileimage,
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

  static async lifehackValidation(req, res, next) {
    const { title } = req.body;
    const exists = await hackModel.getSingleHack({ title });
    if (exists) {
      return requestHelper.error(
        res,
        409,
        'Lifehack with this title already exist'
      );
    }
    const check = checkItem({ title });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    return next();
  }

  static async stepsValidation(req, res, next) {
    const { steps } = req.body;

    const check = checkItem({ steps });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    return next();
  }
};
