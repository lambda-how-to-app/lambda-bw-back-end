const requestHelper = require('../helpers/requestHelper');
const guideModel = require('../database/models/lifeHackModel');

const createLifeHack = async (req, res) => {
  const guide_auth_id = req.decoded.userId;
  const role = req.decoded.guide;
  const { title, banner_image } = req.body;
  if (guide_auth_id && role === true) {
    try {
      const newHack = await guideModel.addHack({
        title,
        banner_image,
        guide_auth_id
      });
      if (newHack) {
        return requestHelper.success(
          res,
          201,
          'LifeHack Created Successfully',
          newHack
        );
      }
    } catch (err) {
      return requestHelper.error(res, 500, 'server error');
    }
  }
  return requestHelper.error(res, 400, 'You Are Not Authorized');
};

const getLifeHacks = async (req, res) => {
  try {
    const hacks = await guideModel.getAllHacks();
    requestHelper.success(res, 201, 'LifeHack Created Successfully', hacks);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

module.exports = { createLifeHack, getLifeHacks };
