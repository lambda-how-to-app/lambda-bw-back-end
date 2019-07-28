const authUsers = require('../mock/authUsers');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authenticatedUsers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('authenticatedUsers').insert(authUsers);
    });
};
