const Users = require('../mock/users');
exports.seed = function(knex) {
  return knex('users').insert(Users);
};
