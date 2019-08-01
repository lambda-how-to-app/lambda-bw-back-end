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
    const hackToAddStep = await stepsModel.getSingleHack({ id });

    if (!hackToAddStep) {
      return requestHelper.error(
        res,
        404,
        'Life hack with provided id does not exist'
      );
    }

    const { userId } = req.decoded;

    if (userId !== hackToAddStep.guide_auth_id) {
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

const getStepById = async (req, res) => {
  try {
    const { id } = req.params;
    const stepToGet = await stepsModel.getSingleStep({ id });

    if (!stepToGet) {
      return requestHelper.error(
        res,
        404,
        'Step with provided id does not exist'
      );
    }

    const step = await stepsModel.getSingleStep({ id });

    return requestHelper.success(
      res,
      200,
      'Step Retrieved Successfully for Lifehack',
      step
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const updateStep = async (req, res) => {
  try {
    const { id } = req.params;
    const stepToUpdate = await stepsModel.getSingleStep({ id });

    if (!stepToUpdate) {
      return requestHelper.error(
        res,
        404,
        'Step with provided id does not exist'
      );
    }
    const HackThatOwnStep = await stepsModel.getSingleHack({
      id: stepToUpdate.hack_id
    });

    const { userId } = req.decoded;

    if (userId !== HackThatOwnStep.guide_auth_id) {
      return requestHelper.error(res, 400, 'You Are Not Authorized');
    }

    const stepUpdate = await stepsModel.updateStep(req.body, id);

    return requestHelper.success(
      res,
      200,
      'Step Updated Successfully for Lifehack',
      stepUpdate
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const deleteStep = async (req, res) => {
  try {
    const { id } = req.params;
    const stepToDelete = await stepsModel.getSingleStep({ id });

    if (!stepToDelete) {
      return requestHelper.error(
        res,
        404,
        'Step with provided id does not exist'
      );
    }
    const HackThatOwnStep = await stepsModel.getSingleHack({
      id: stepToDelete.hack_id
    });

    const { userId } = req.decoded;

    if (userId !== HackThatOwnStep.guide_auth_id) {
      return requestHelper.error(res, 400, 'You Are Not Authorized');
    }

    await stepsModel.deleteStep(id);

    return requestHelper.success(
      res,
      200,
      'Step deleted Successfully for this Lifehack'
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

const getSteps = async (req, res) => {
  try {
    const allSteps = await stepsModel.getAllSteps();
    return requestHelper.success(
      res,
      200,
      'Steps retrieved Successfully',
      allSteps
    );
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
};

module.exports = {
  getStepsForASingleHack,
  createStep,
  updateStep,
  deleteStep,
  getStepById,
  getSteps
};
