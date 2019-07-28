const Guide = require('../mock/guides');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('guides')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('guides').insert(Guide);
    });
};
