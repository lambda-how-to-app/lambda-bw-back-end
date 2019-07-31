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
    // return Promise.all([update]).then(results => ([update] = results));
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

module.exports = {
  getAllHacks,
  addHack,
  getSingleHack,
  updateHack,
  deleteHack
};
