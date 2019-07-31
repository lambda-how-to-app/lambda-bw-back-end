const hacks = require('../mock/hacks');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lifehacks')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('lifehacks').insert(hacks);
    });
};
