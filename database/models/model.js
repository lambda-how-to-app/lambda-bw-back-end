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
const addUser = async user => {
  let newuser = await db('authenticatedusers')
    .insert(user)
    .returning('*')
    .then(user => user[0]);
  return newuser;
};
const saveHack = async post => {
  try {
    const saved = await db('savedhacks')
      .insert(post)
      .returning('*');
    return saved;
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { status: 409, mesage: 'You have already reviewed this lifehack' };
    }
  }
};

const addReview = async review => {
  try {
    const postReview = await db('reviews')
      .insert(review)
      .returning('*');
    return postReview;
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { status: 409, mesage: 'You have already saved this lifehack' };
    }
  }
};

module.exports = {
  addUser,
  findAuthUser,
  findSingleUser,
  saveHack,
  addReview
};
