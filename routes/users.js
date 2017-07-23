"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex.raw(
      `SELECT
        m.id AS movie_pk,
        m.name AS movie_name,
        m.vote_average AS movie_rating,
        m.img AS movie_image
      FROM users u
      LEFT OUTER JOIN users_movies um
      ON u.id = um.users_id
      LEFT OUTER JOIN movies m
      ON m.id = um.movies_id
      WHERE u.id = ?`, [req.session.user_id])
    .then(function(movieResponse) {

      responseObj["movielist"] = movieResponse;
      console.log(movieResponse);


    })
    knex.raw(
      `SELECT
        b.id AS book_pk,
        b.name AS book_name,
        b.author AS book_author,
        b.img AS book_image
      FROM users u
      LEFT OUTER JOIN users_books ub
      ON ub.users_id = u.id
      LEFT OUTER JOIN books b
      ON b.id = ub.books_id
      WHERE u.id = ?`, [req.session.user_id])
    .then(function(bookResponse){
      console.log(bookResponse.rows)
    })
    knex.raw(
      `SELECT
        pr.id AS product_pk,
        pr.name AS product_name,
        pr.img AS product_image
      FROM users u
      LEFT OUTER JOIN users_products upr
      ON upr.users_id = u.id
      LEFT OUTER JOIN products pr
      ON pr.id = upr.products_id
      WHERE u.id = ?`, [req.session.user_id])
    .then(function(productResponse){
      console.log(productResponse.rows)
    })
    knex.raw(
      `SELECT
        pl.id AS place_pk,
        pl.name AS place_name,
        pl.address AS place_address,
        pl.img AS place_image
      FROM users u
      LEFT OUTER JOIN users_places upl
      ON upl.users_id = u.id
      LEFT OUTER JOIN places pl
      ON pl.id = upl.places_id
      WHERE u.id = ?`, [req.session.user_id])
    .then(function(placeResponse){
      console.log(placeResponse.rows)
    })
  });

  router.post("/", (req, res) => {
    if (req.body.category === 'movie') {
      console.log('insert movie')
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
    console.log('insert book')
    knex.insert([{
      name: req.body.title,
      author: req.body.author,
      img: req.body.img
    }], 'id')
    .into('books')
    .returning('id')
    .asCallback(function (err, result) {
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
    console.log('insert place')
    knex.insert([{
      name: req.body.title,
      address: req.body.address,
      img: req.body.img
    }], 'id')
    .into('places')
    .returning('id')
    .asCallback(function (err, result) {
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
    console.log('insert product')
    knex.insert([{
      name: req.body.title,
      img: req.body.img
    }], 'id')
    .into('products')
    .returning('id')
    .asCallback(function (err, result) {
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

  // router.post("/delete" (req, res) => {
  //after getting some data from the ajax call look up
  //in the database the correct item in Users_categories table
  // and delete that row
  // })

  return router
}
