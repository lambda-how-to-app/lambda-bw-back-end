const requestHelper = require('../helpers/requestHelper');
const stepsModel = require('../database/models/lifeHackModel');

const getStepsForASingleHack = async (req, res) => {
  try {
    const { id } = req.params;
    const hackSteps = await stepsModel.getStepsForSingleHack(id);
    return requestHelper.success(
      res,
      200,
      'Succesfully retrieved steps for selected hack',
      hackSteps
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const createStep = async (req, res) => {
  try {
    const { id } = req.params;
    const hackToAddSrep = await stepsModel.getSingleHack({ id });

    if (!hackToAddSrep) {
      return requestHelper.error(
        res,
        404,
        'Life hack with provided id does not exist'
      );
    }

    const { userId } = req.decoded;

    if (userId !== hackToAddSrep.guide_auth_id) {
      return requestHelper.error(res, 400, 'You Are Not Authorized');
    }
    const { steps } = req.body;
    const addedStep = await stepsModel.addStep({ steps, hack_id: id });

    return requestHelper.success(
      res,
      200,
      'Step Added Successfully To Lifehack',
      addedStep
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

module.exports = { getStepsForASingleHack, createStep };
