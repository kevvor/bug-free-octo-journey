exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments();
      table.text('email');
      table.text('password');
    }),
    knex.schema.createTable('movies', function(table){
      table.increments();
      table.text('name');
      table.text('img');
      table.integer('vote_average');
    }),
    knex.schema.createTable('books', function(table){
      table.increments();
      table.text('name');
      table.text('img');
      table.text('author');
    }),
    knex.schema.createTable('places', function(table){
      table.increments();
      table.text('name');
      table.text('img');
      table.text('address');
    }),
    knex.schema.createTable('products', function(table){
      table.increments();
      table.text('name');
      table.text('img');
    }),
    knex.schema.createTable('users_movies', function(table){
      table.increments();
      table.integer('users_id');
      table.integer('movies_id');
      table.foreign('users_id').references('id').inTable('users');
      table.foreign('movies_id').references('id').inTable('movies');
    }),
    knex.schema.createTable('users_books', function(table){
      table.increments();
      table.integer('users_id');
      table.integer('books_id');
      table.foreign('users_id').references('id').inTable('users');
      table.foreign('books_id').references('id').inTable('books');
    }),
    knex.schema.createTable('users_places', function(table){
      table.increments();
      table.integer('users_id');
      table.integer('places_id');
      table.foreign('users_id').references('id').inTable('users');
      table.foreign('places_id').references('id').inTable('places');
    }),
    knex.schema.createTable('users_products', function(table){
      table.increments();
      table.integer('users_id');
      table.integer('products_id');
      table.foreign('users_id').references('id').inTable('users');
      table.foreign('products_id').references('id').inTable('products');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_movies'),
    knex.schema.dropTable('users_books'),
    knex.schema.dropTable('users_places'),
    knex.schema.dropTable('users_products'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('movies'),
    knex.schema.dropTable('books'),
    knex.schema.dropTable('places'),
    knex.schema.dropTable('products')
  ])
};


