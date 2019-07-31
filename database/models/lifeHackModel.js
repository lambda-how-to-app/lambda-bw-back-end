const db = require('../dbConfig');

const getAllHacks = async () => {
  let hacks = await db('lifehacks');
  return hacks;
};

const addHack = async hack => {
  let newhack = await db('lifehacks')
    .insert(hack)
    .returning('*')
    .then(hack => hack[0]);
  return newhack;
};

module.exports = { getAllHacks, addHack };
