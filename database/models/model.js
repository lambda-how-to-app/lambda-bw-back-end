const db = require('../dbConfig');

const findAuthUser = () => {
  let users = db('authenticatedusers');
  return users.map(user => {
    return { ...user, guide: !!user.guide };
  });
};
const findById = async id => {
  const user = await db('authenticatedusers').where({ id });
  return [{ ...user, guide: !!user.guide }];
};
const findByUsername = username => {
  return db('authenticatedusers').where({ username });
};
const addUser = user => {
  return db('authenticatedusers')
    .insert(user)
    .returning('*')
    .then(user => user[0]);
};

module.exports = { addUser, findAuthUser, findById, findByUsername };
