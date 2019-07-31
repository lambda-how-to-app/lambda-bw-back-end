exports.up = function(knex) {
  return knex.schema
    .createTable('lifehacks', table => {
      table.increments();
      table
        .string('title', 255)
        .notNullable()
        .unique();
      table.string('banner_image', 255);
      table
        .integer('guide_auth_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('authenticatedusers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('hacksteps', table => {
      table.increments();
      table
        .string('steps', 255)
        .notNullable()
        .unique();
      table
        .integer('hack_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('lifehacks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('lifehacks')
    .dropTableIfExists('hacksteps');
};
