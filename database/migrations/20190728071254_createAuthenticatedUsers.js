exports.up = function(knex) {
  return knex.schema
    .createTable('authenticatedusers', table => {
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
    })
    .createTable('locations', table => {
      table.increments();
      table
        .string('locations', 255)
        .notNullable()
        .unique();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('authenticatedusers')
    .dropTableIfExists('locations');
};
