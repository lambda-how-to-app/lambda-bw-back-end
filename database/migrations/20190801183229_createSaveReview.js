exports.up = function(knex) {
  return knex.schema
    .createTable('savedhacks', table => {
      table.increments();
      table.unique(['post_id', 'user_id']);
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('authenticatedusers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('lifehacks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('reviews', table => {
      table.increments();
      table.unique(['post_id', 'user_id']);
      table.string('review', 255).notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('authenticatedusers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('post_id')
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
    .dropTableIfExists('savedhacks')
    .dropTableIfExists('reviews');
};
