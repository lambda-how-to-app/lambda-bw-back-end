const steps = require('../mock/steps');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('hacksteps')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('hacksteps').insert(steps);
    });
};
