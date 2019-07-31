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
    if (role) {
      const users = await userModel.findSingleUser({ guide: role });
      return requestHelper.success(
        res,
        200,
        `Successfully retrieved all ${type}`,
        users
      );
    }
    return requestHelper.error(res, 400, 'User type does not exist');
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

// const getProfile = async (req, res) => {
//   try {
//     const userProfile = req.profile;
//     requestHelper.success(res, 200, 'Successfully retrieved user', userProfile);
//   } catch (err) {
//     return requestHelper.error(res, 500, 'server error');
//   }
// };
// const getAllUsers = async (req, res, role) => {
//   try {
//     if (role) {
//       const users = await userModel.findAllProfile(role);
//       return requestHelper.success(
//         res,
//         200,
//         'Successfully retrieved all users',
//         users
//       );
//     }
//     const users = await userModel.findAllProfile();
//     requestHelper.success(res, 200, 'Successfully retrieved all users', users);
//   } catch (err) {
//     return requestHelper.error(res, 500, 'server error');
//   }
// };

// const createProfile = async (req, res) => {
//   const auth_id = req.decoded.userId;
//   const { fullname, profileimage, location_id } = req.body;
//   try {
//     if (auth_id) {
//       const profile = await userModel.addProfile(
//         {
//           fullname,
//           profileimage,
//           location_id,
//           auth_id
//         },
//         auth_id
//       );
//       // console.log(profile);
//       return requestHelper.success(
//         res,
//         200,
//         'Successfully created profile',
//         profile
//       );
//     }
//     return requestHelper.error(res, 400, 'Not Allowed');
//   } catch (err) {
//     return requestHelper.error(res, 500, 'server error');
//   }
// };

module.exports = {
  createUser,
  login,
  getAllUsers,
  getAUser,
  getByType
};
