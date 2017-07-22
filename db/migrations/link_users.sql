  SELECT movies.name, movies.vote_average, movies.img
    FROM users, users_movies, movies
    WHERE users.id = 1
    AND users.id = users_movies.users_id;

  SELECT books.name, books.author, books.img
    FROM users, users_books, books
    WHERE users.id = 1
    AND users.id = users_books.users_id;

  SELECT products.name, products.img
    FROM users, users_products, products
    WHERE users.id = 1
    AND users.id = users_products.users_id;

  SELECT places.name, places.address, places.img
    FROM users, users_places, places
    WHERE users.id = 1
    AND users.id = users_places.users_id;
