const db = require('../dbConfig');

const findAuthUser = () => {
  let users = db('authenticatedusers');
  return users.map(user => {
    return { ...user, guide: !!user.guide };
  });
};
const findSingleUser = async filter => {
  const user = await db('authenticatedusers').where(filter);
  console.log(user);
  return [{ ...user, guide: !!user.guide }];
};
const addUser = user => {
  return db('authenticatedusers')
    .insert(user)
    .returning('*')
    .then(user => user[0]);
};

module.exports = {
  addUser,
  findAuthUser,
  findSingleUser
};
