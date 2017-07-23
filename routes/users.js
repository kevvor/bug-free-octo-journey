"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    console.log('in / knex')
    knex.raw(
        `SELECT m.name AS movie_name, m.vote_average AS movie_rating, m.img AS movie_image,
        b.name AS book_name, b.author AS book_author, b.img AS book_image,
        pr.name AS product_name, pr.img AS product_image,
        pl.name AS place_name, pl.address AS place_address, pl.img AS place_image
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
      WHERE u.id = ?`, [req.session.user_id])
    .then(function(response) {

    res.json(response.rows[0]);

    // console.log(response.rows[0])

    })
  })
  console.log('before router')

  // router.post("/", (req, res) => {
  //   console.log('in post /')
  //   knex.insert([{
  //     name: 'citizen kane',
  //     img: 'poster',
  //     vote_average: '10'
  //   }], 'id')
  //   .into('movies')
  //   .asCallback(function (err, result) {
  //     if (err) {
  //       console.log('in callback')
  //       console.log(err)
  //     }
  //     else {
  //       console.log(result)
  //     }
  //   });
  // });
  return router
}












