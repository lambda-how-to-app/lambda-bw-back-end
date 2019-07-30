const requestHelper = require('../helpers/requestHelper');
const locationModel = require('../database/models/model');

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns locations
 */
const getLocations = async (req, res) => {
  try {
    const locations = await locationModel.getLocation();
    return requestHelper.success(
      res,
      200,
      'Successfully retrieved all users',
      locations
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const getLocationById = async (req, res) => {
  const id = req.pramas.id;
  try {
    const locations = await locationModel.getLocation({ id });
    return requestHelper.success(
      res,
      200,
      'Successfully retrieved all users',
      locations
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};
module.exports = { getLocations, getLocationById };
