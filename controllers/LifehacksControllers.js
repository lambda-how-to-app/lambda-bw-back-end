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
    requestHelper.success(res, 201, 'LifeHacks retrieved Successfully', hacks);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const getOneHack = async (req, res) => {
  const id = req.params.id;
  try {
    const hack = await guideModel.getSingleHack({ id });
    requestHelper.success(res, 200, 'LifeHack retrieved Successfully', hack);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

/**
 * Update life hack details given the id is valid
 *
 * @param {*} req
 * @param {*} res
 */
const updateHack = async (req, res) => {
  try {
    const { id } = req.params;

    const hackToUpdate = await guideModel.getSingleHack({ id });

    if (!hackToUpdate) {
      return requestHelper.error(
        res,
        404,
        'Life hack with provided id does not exist'
      );
    }

    const { userId } = req.decoded;

    if (userId !== hackToUpdate.guide_auth_id) {
      return requestHelper.error(res, 400, 'You Are Not Authorized');
    }

    const hackToUpdateNewDetails = req.body;

    const hackUpdate = await guideModel.updateHack(hackToUpdateNewDetails, id);

    return requestHelper.success(
      res,
      200,
      'Lifehack Updated Successfully',
      hackUpdate
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};
module.exports = { createLifeHack, getLifeHacks, getOneHack, updateHack };
