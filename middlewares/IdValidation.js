const userModel = require('../database/models/model');
const requestHelper = require('../helpers/requestHelper');

async function validateId(req, res, next) {
  const paramsId = req.params.id ? req.params.id : '';
  const id = paramsId;
  if (id !== undefined && id !== '' && id.search(/[^A-Za-z\s]/) !== -1) {
    let user = await userModel.findSingleProfile(id);
    if (Object.keys(user).length !== 0 || user !== undefined) {
      // eslint-disable-next-line require-atomic-updates
      req.profile = user;
      next();
    } else {
      requestHelper.success(res, 400, 'invalid user id');
    }
  } else {
    requestHelper.success(res, 400, 'invalid id type');
  }
}
module.exports = validateId;
