"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
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
      console.log(response);
    })
  });

  router.post("/", (req, res) => {
    if (req.body.category === 'movie') {
    knex.insert([{
      name: req.body.title,
      img: req.body.img,
      vote_average: req.body.rating
    }], 'id')
    .into('movies')
    .returning('id')
    .asCallback(function (err, result) {
      console.log('first post result')
      console.log(result[0]);
      if (err) return console.error(err);
      knex.insert([{
        users_id: req.session.user_id,
        movies_id: result[0]
      }])
      .into('users_movies')
      .asCallback(function(err, result) {
        if (err) return console.error(err);;
        console.log(result)
      });
    })
    }
    if (req.body.category === 'book') {
    knex.insert([{
      name: //req.body.title,
      author: //req.body.img,
      img: //req.body.rating
    }], 'id')
    .into('books')
    .returning('id')
    .asCallback(function (err, result) {
      console.log('book')
      console.log(result[0]);
      if (err) return console.error(err);
      knex.insert([{
        users_id: req.session.user_id,
        books_id: result[0]
      }])
      .into('users_books')
      .asCallback(function(err, result) {
        if (err) return console.error(err);
        console.log(result)
      });
    })
    }
    if (req.body.category === 'place') {
    knex.insert([{
      name: //req.body.title,
      address: //req.body.img,
      img: //req.body.rating
    }], 'id')
    .into('places')
    .returning('id')
    .asCallback(function (err, result) {
      console.log('place')
      console.log(result[0]);
      if (err) return console.error(err);
      knex.insert([{
        users_id: req.session.user_id,
        places_id: result[0]
      }])
      .into('users_places')
      .asCallback(function(err, result) {
        if (err) return console.error(err);
        console.log(result)
      });
    })
    }
    if (req.body.category === 'product') {
    knex.insert([{
      name: //req.body.title,
      img: //req.body.rating
    }], 'id')
    .into('products')
    .returning('id')
    .asCallback(function (err, result) {
      console.log('product')
      console.log(result[0]);
      if (err) return console.error(err);
      knex.insert([{
        users_id: req.session.user_id,
        products_id: result[0]
      }])
      .into('users_products')
      .asCallback(function(err, result) {
        if (err) return console.error(err);
        console.log(result)
      });
    })
    }
  });
  return router
}












