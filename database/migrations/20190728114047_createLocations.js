exports.up = function(knex) {
  return knex.schema.createTable('locations', table => {
    table.increments();
    table
      .string('locations', 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('locations');
};
