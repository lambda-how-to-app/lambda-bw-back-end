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
// function getReviewed() {
//   return db
//     .select('lifehacks.id', 'lifehacks.title')
//     .from('lifehacks')
//     .innerJoin('savedhacks', 'savedhacks.user_id', 'lifehacks.id')
//     .where('user_id', user_id)
//     .returning('*');
// }
const saveHack = async post => {
  const saved = await db('savedhacks')
    .insert(post)
    .returning('*');

  return saved;
};

const addReview = async review => {
  const postReview = await db('reviews')
    .insert(review)
    .returning('*');
  console.log('===========', postReview);
  return postReview;
};

module.exports = {
  addUser,
  findAuthUser,
  findSingleUser,
  saveHack,
  addReview
};
