const db = require('../dbConfig');

const getAllHacks = async () => {
  let hacks = await db('lifehacks');
  return hacks;
};

const getSingleHack = async filter => {
  let hack = await db('lifehacks').where(filter);
  return hack;
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
    let update = await db('lifehacks')
      .where(id)
      .update(changes)
      .returning('*')
      .then(hack => hack[0]);
    return update;
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { status: 409, mesage: 'Lifehack with this title already exist' };
    }
  }
};

module.exports = { getAllHacks, addHack, getSingleHack, updateHack };
