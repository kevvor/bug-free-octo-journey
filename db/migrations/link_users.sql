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

  SELECT m.name, m.vote_average, m.img, b.name, b.author, b.img, pr.name, pr.img, pl.name, pl.address, pl.img
    FROM users u
    JOIN users_movies um
    ON u.id = um.users_id
    JOIN movies m
    ON m.id = um.movies_id
    JOIN users_books ub
    ON ub.users_id = u.id
    JOIN books b
    ON b.id = ub.books_id
    JOIN users_products upr
    ON upr.users_id = u.id
    JOIN products pr
    ON pr.id = upr.products_id
    JOIN users_places upl
    ON upl.users_id = u.id
    JOIN places pl
    ON pl.id = upl.places_id
    WHERE u.id = 1;
