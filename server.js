"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');


//amazon keys
const secrets = require('./secrets')
const amazon = require('amazon-product-api');
const client = amazon.createClient({
  awsId: secrets.awsId,
  awsSecret: secrets.awsSecret,
  awsTag: secrets.awsTag
});
//yelp keys
const Yelp = require('yelp-v3');
const yelp = new Yelp({
  access_token: secrets.access_token
});

//tmdb keys
const tmdb = new (require('tmdbapi'))({
    apiv3: '7d8ef982ea01e0242adda607f0ac0065'
});
//Google books doesn't even need a key wat
const books = require('google-books-search');

function generateRandomString(length) { // generates a random string
  let randomString = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomString;
}

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts")

const users = {};

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(cookieSession({
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static("public"));

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



// Mount all resource routes
app.use("/api/users", usersRoutes(knex));


app.get("/login", (req, res)=>{
  res.render("login");
});

app.post("/login", (req, res)=>{
  knex('users').where({
    email: req.body.email,
    password: req.body.password
  }).select('id')
  .asCallback(function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log('result login: '+result)
    if (result.length == 1) {
      console.log('result[0] '+result[0])
      req.session.user_id = result[0].id //set cookie to primary
      res.redirect('/');
    }
    else {
      res.redirect('/error')
    }
  })
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  knex('users').where({
    email: req.body['email']}).select('id')
  .asCallback(function (err, result) {
  if (err) {
    console.log(err)
  }
  if (result.length == 0) {
  knex.insert(
    [{email: req.body['email'],
      password: req.body['password']}],
      'id')
  .returning('id')
  .into('users')
  .asCallback(function (err, result) {
    if (err) {
      console.log(err)
    }
    req.session.user_id = result //set cookie to primary
  })
  }
  else {
    console.log('email already exists');
  }
  })
  res.redirect('/login');
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// Home page
app.get("/", (req, res) => {
  let loginCookie = req.session.user_id;
  if(!loginCookie) {
    res.redirect('/error');
  }
  res.render("index");
});

app.post("/", (req, res) => {
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
});

// app.get("/user/:cookieId", (req, res) => {

// });

app.get ('/error', (req, res) => {
  res.render('error');
});

app.get("/amazonSearch", (req,res)=>{
  console.log(req.query.userinput)
  client.itemSearch({
    Keywords: req.query.userinput,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(result){
    res.json(result);
    console.log(result[0].LargeImage[0].URL[0]);
  }).catch(function(err){
    console.log(err.Error[0].Message);
  });
})

app.get("/yelpSearch",(req,res)=>{
  console.log(req.query.userinput)
  yelp.search({ term: req.query.userinput, location: 'Montreal' })
  .then(function (result) {
    res.json(result)
    console.log(result.businesses[0]);
  })
  .catch(function (err) {
    console.error(err);
  });
})

app.get("/tmdbSearch",(req,res)=>{
  console.log(req.query.userinput)
  tmdb.search.movie({query: req.query.userinput})
  .then(function(result){
    res.json(result)
     console.log(result.results[0])
  })
  .catch(console.error);

})

app.get("/googleBooksSearch",(req,res)=>{
  console.log(req.query.userinput);
  books.search(req.query.userinput, function(error, result) {
    if ( ! error ) {
        res.json(result)
        console.log(result);
    } else {
        console.log(error);
    }
  });

})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
