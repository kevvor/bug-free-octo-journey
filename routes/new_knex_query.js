    // // knex.select(
    // //   'movies.name',
    // //   'movies.vote_average',
    // //   'movies.img')
    // // .from('users')
    // // .leftOuterJoin(
    // //   'users_movies',
    // //   'users.id',
    // //   'users_movies.users_id')
    // // .where(
    // //   'users.id' , req.session.user_id
    // // ).as('um')
    //     SELECT m.name AS movie_name,
    //     // m.vote_average AS movie_rating,
    //     // m.img AS movie_image,
    //     // b.name AS book_name,
    //     // b.author AS book_author,
    //     // b.img AS book_image,
    //     // pr.name AS product_name,
    //     // pr.img AS product_image,
    //     // pl.name AS place_name,
    //     // pl.address AS place_address,
    //     // pl.img AS place_image
    //   FROM users u
    //   // LEFT OUTER JOIN users_movies um
    //   // ON u.id = um.users_id
    //   // LEFT OUTER JOIN movies m
    //   // ON m.id = um.movies_id
    //   // LEFT OUTER JOIN users_books ub
    //   // ON ub.users_id = u.id
    //   // LEFT OUTER JOIN books b
    //   // ON b.id = ub.books_id
    //   LEFT OUTER JOIN users_products upr
    //   ON upr.users_id = u.id
    //   LEFT OUTER JOIN products pr
    //   ON pr.id = upr.products_id
    //   // LEFT OUTER JOIN users_places upl
    //   // ON upl.users_id = u.id
    //   // LEFT OUTER JOIN places pl
    //   // ON pl.id = upl.places_id
    //   WHERE u.id = ?, [req.session.user_id])
