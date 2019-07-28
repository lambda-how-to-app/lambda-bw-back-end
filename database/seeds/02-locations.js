const Locations = require('../mock/locations');
exports.seed = function(knex) {
  return knex('locations').insert(Locations);
};
