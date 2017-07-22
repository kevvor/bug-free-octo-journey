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
  for (let user_id in users) {
    if (users[user_id].email === req.body['email'] && req.body['password'] === users[user_id].password) {
      res.redirect("/");
      console.log(users);
      return;
    }
    console.log('out of loop, before redirect')
  }
  res.redirect('/error');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  let newUser_id = generateRandomString(4);
  if (req.body['email'] === '' || req.body['password'] === '') {
    res.status(404).redirect('/error');
    return;
  }
// check if email has already been assigned
  for (let user_id in users) {
    if (users[user_id].email === req.body['email']) {
      res.status(404).redirect('/error');
      return;
    }
  }
  users[newUser_id] = {};
  users[newUser_id].email = req.body['email'];
  users[newUser_id].password = req.body['password'];
  req.session.user_id = newUser_id;
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

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
