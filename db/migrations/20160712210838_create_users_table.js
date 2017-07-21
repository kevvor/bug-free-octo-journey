exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments();
      table.text('name');
      table.text('category');
    }),
    knex.schema.createTable('userlists_items', function(table){
      table.increments();
      table.dateTime('date_added');
      table.integer('userlists_id');
      table.integer('items_id');
      table.foreign('userlists_id').references('id').inTable('userlists')
      table.foreign('items_id').references('id').inTable('items');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
