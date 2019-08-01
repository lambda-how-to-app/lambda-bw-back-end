const db = require('../dbConfig');

const getAllHacks = async () => {
  let hacks = await db('lifehacks');
  return hacks;
};

const getSingleHack = filter => {
  return db('lifehacks')
    .where(filter)
    .first();
};

const addHack = async hack => {
  try {
    let newhack = await db('lifehacks')
      .insert(hack)
      .returning('*')
      .then(hack => hack[0]);
    return newhack;
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { status: 409, mesage: 'Lifehack with this title already exist' };
    }
  }
};

const updateHack = async (changes, id) => {
  try {
    return await db('lifehacks')
      .where({ id })
      .update(changes)
      .returning('*')
      .then(hack => hack[0]);
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { status: 409, mesage: 'Lifehack with this title already exist' };
    }
  }
};

const deleteHack = async id => {
  return await db('lifehacks')
    .where({ id })
    .del();
};

const getStepsForSingleHack = async id => {
  return await db
    .select('hacksteps.steps', 'hacksteps.id', 'lifehacks.title')
    .from('lifehacks')
    .join('hacksteps', 'hacksteps.hack_id', 'lifehacks.id')
    .where({ 'lifehacks.id': id });
};

const addStep = async step => {
  return db('hacksteps')
    .insert(step)
    .returning('*')
    .then(newStep => newStep[0]);
};

const updateStep = async (changes, id) => {
  try {
    return await db('hacksteps')
      .where({ id })
      .update(changes)
      .returning('*')
      .then(hack => hack[0]);
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { status: 409, mesage: 'Lifehack with this title already exist' };
    }
  }
};

const deleteStep = async id => {
  return await db('hacksteps')
    .where({ id })
    .del();
};
const getAllSteps = async () => {
  return db('hacksteps');
};

const getSingleStep = async filter => {
  return db('hacksteps')
    .where(filter)
    .first();
};

module.exports = {
  getAllHacks,
  addHack,
  getSingleHack,
  updateHack,
  deleteHack,
  getStepsForSingleHack,
  addStep,
  updateStep,
  deleteStep,
  getAllSteps,
  getSingleStep
};
