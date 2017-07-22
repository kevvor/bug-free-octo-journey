exports.seed = function(knex, Promise) {
  return knex('users').insert({
    email: 'a@a.com',
    password: 'pwd'
  }).then(function(){
    return knex('movies').insert({
      name: 'superman',
      vote_average: '6',
      img: 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/n2DOECThGG7h7m5AjLi2Nuh23u1.jpg'
    });
  }).then(function(){
    return knex('books').insert({
      name: 'harry potter',
      author: 'jk rowling',
      img: 'https://images-na.ssl-images-amazon.com/images/I/51VrfksFQ8L._AA500_FMwebp_QL65_.jpg'
    });
  }).then(function(){
    return knex('places').insert({
      name: 'boustan',
      address: '2020 Rue Crescent',
      img: 'https://s3-media3.fl.yelpcdn.com/bphoto/c9DhhxAABnj3dwcrSH1hSw/o.jpg'
    });
  }).then(function(){
    return knex('products').insert({
      name: 'skates',
      img: 'https://images-na.ssl-images-amazon.com/images/I/51PUtmY+4cL._FMwebp_QL65_.jpg'
    });
  }).then(function(){
    return knex('users_movies').insert({
      users_id: 1,
      movies_id: 1
    });
  }).then(function(){
    return knex('users_books').insert({
      users_id: 1,
      books_id: 1
    });
  }).then(function(){
    return knex('users_products').insert({
      users_id: 1,
      products_id: 1
    });
  }).then(function(){
    return knex('users_places').insert({
      users_id: 1,
      places_id: 1
    });
  })
};
