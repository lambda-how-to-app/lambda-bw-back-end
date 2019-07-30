const requestHelper = require('../helpers/requestHelper');
const createToken = require('../helpers/createToken');

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

const getProfile = async (req, res) => {
  try {
    const userProfile = req.profile;
    requestHelper.success(res, 200, 'Successfully retrieved user', userProfile);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

module.exports = { createUser, login, getProfile };
