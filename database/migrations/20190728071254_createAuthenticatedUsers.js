exports.up = function(knex) {
  return knex.schema.createTable('authenticatedUsers', table => {
    table.increments();
    table
      .string('username', 255)
      .notNullable()
      .unique();
    table
      .string('email', 128)
      .notNullable()
      .unique();
    table.string('password', 255).notNullable();
    table.boolean('guide').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authenticatedUsers');
};
