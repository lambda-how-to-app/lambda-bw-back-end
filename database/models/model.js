const db = require('../dbConfig');
const tables = {
  authUser: 'authenticatedUsers',
  users: 'users',
  guide: 'guides',
  location: 'locations'
};

const findAuthUser = () => {
  let users = db(tables.authUser);
  return users.map(user => {
    return { ...user, guide: !!user.guide };
  });
};
const findById = id => {
  const user = db(tables.authUser).where({ id });
  return [{ ...user, guide: !!user.guide }];
};
const findByUsername = username => {
  return db(tables.authUser).where({ username });
};
const addUser = async user => {
  const [id] = await db(tables.authUser).insert(user);
  return findById({ id });
};

module.exports = { addUser, findAuthUser, findById, findByUsername };
