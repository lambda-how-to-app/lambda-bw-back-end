const db = require('../dbConfig');

/**
 *
 *
 * @returns user object
 */
const findAuthUser = () => {
  let users = db('authenticatedusers');
  return users.map(user => {
    return { ...user, guide: !!user.guide };
  });
};
/**
 *
 *
 * @param {*} filter
 * @returns
 */
const findSingleUser = async filter => {
  const user = await db('authenticatedusers').where(filter);
  return user;
};
/**
 *
 *
 * @param {*} user
 * @returns user object
 */
const addUser = user => {
  return db('authenticatedusers')
    .insert(user)
    .returning('*')
    .then(user => user[0]);
};
// select users.fullname, users.profileimage, locations.locations from users
// join locations on locations.id = location_id where users.id = 2

const findSingleProfile = async id => {
  let search = await findSingleUser({ id });

  let user = await db
    .select('users.fullname', 'users.profileimage', 'locations.locations')
    .from('users')
    .join('locations', 'locations.id', 'users.location_id')
    .where({ 'users.auth_id': id });
  let guide = await db
    .select('guides.fullname', 'guides.profileimage', 'locations.locations')
    .from('guides')
    .join('locations', 'locations.id', 'guides.location_id')
    .where({ 'guides.auth_id': id });
  if (search[0].guide === false) {
    user[0].role = 'user';
    return user;
  }
  if (search[0].guide === true) {
    guide[0].role = 'guide';
    return guide;
  }
};

const findAllProfile = async usertype => {
  let users = await db
    .select('users.fullname', 'users.profileimage', 'locations.locations')
    .from('users')
    .join('locations', 'locations.id', 'users.location_id');

  let guides = await db
    .select('guides.fullname', 'guides.profileimage', 'locations.locations')
    .from('guides')
    .join('locations', 'locations.id', 'guides.location_id');
  if (usertype) {
    if (usertype === 'users') {
      return Promise.all([users]).then(results => ([users] = results));
    }
    if (usertype === 'guides') {
      return Promise.all([guides]).then(results => ([guides] = results));
    }
  }

  return Promise.all([users, guides]).then(
    results => ([users, guides] = results)
  );
};
module.exports = {
  addUser,
  findAuthUser,
  findSingleUser,
  findSingleProfile,
  findAllProfile
};
