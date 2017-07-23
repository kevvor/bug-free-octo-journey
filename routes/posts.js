"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post("/", (req, res) => {
    console.log('in post /')
    knex.insert([{
      name: 'citizen kane',
      img: 'poster',
      vote_average: '10'
    }], 'id')
    .into('movies')
    .asCallback(function (err, result) {
      if (err) {
        console.log('in callback')
        console.log(err)
      }
      else {
        console.log(result)
      }
    })
  return router
  })
}












