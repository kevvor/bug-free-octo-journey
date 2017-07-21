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
      table.foreign('users_id').references('users.id');
      table.foreign('movies_id').references('movies.id');
    }),
    knex.schema.createTable('users_books', function(table){
      table.increments();
      table.foreign('users_id').references('users.id');
      table.foreign('books_id').references('books.id');
    }),
    knex.schema.createTable('users_places', function(table){
      table.increments();
      table.foreign('users_id').references('users.id');
      table.foreign('restaurants_id').references('restaurants.id');
    }),
    knex.schema.createTable('users_products', function(table){
      table.increments();
      table.foreign('users_id').references('users.id');
      table.foreign('products_id').references('products.id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('movies'),
    knex.schema.dropTable('books'),
    knex.schema.dropTable('places'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('users_movies'),
    knex.schema.dropTable('users_books'),
    knex.schema.dropTable('users_places'),
    knex.schema.dropTable('users_products'),
  ])
};


