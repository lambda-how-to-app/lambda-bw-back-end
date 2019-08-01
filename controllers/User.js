const requestHelper = require('../helpers/requestHelper');
const createToken = require('../helpers/createToken');
const userModel = require('../database/models/model');

const createUser = async (req, res) => {
  try {
    const payload = req.newuser;
    createToken(res, 201, 'Signup succesful', payload);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};
const login = async (req, res) => {
  try {
    const payload = req.checked;
    createToken(res, 200, 'Login succesful', payload);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAuthUser();
    return requestHelper.success(
      res,
      200,
      'Successfully retrieved all users',
      users
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};
const getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findSingleUser({ id });
    return requestHelper.success(
      res,
      200,
      'Successfully retrieved all users',
      user
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const getByType = async (req, res, role) => {
  try {
    let type = role === true ? 'guides' : 'users';
    if (role === true) {
      const users = await userModel.findSingleUser({ guide: role });
      return requestHelper.success(
        res,
        200,
        `Successfully retrieved all ${type}`,
        users
      );
    }
    const users = await userModel.findAuthUser();
    let regularUsers = await users.filter(user => user.guide !== true);
    return requestHelper.success(
      res,
      200,
      `Successfully retrieved all ${type}`,
      regularUsers
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getAUser,
  getByType
};
