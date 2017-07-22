$(document).ready(function() {

// When I do an AJAX request I need the database to return
// me the following 4 types of objects
// do 1 AJAX request returns me one object (viewModel) that contains

// when USER ADDs 1. adds to the database
// then it adds it to the object in memory

// in the future will do the following:
// let viewModel = {};
// // AJAX call
// .then(viewmodel) {
//   _viewModel = viewmodel;
// }

let dataBase = response.rows[0];

dataBase.movie_image

// Everything that's rendered for movies etc etc
viewModel.response.rows[0].movietitle
viewModel.response.rows[0].moviename
// etc etc

let viewmodel  = {

}


let _viewModel = {
  dataMovies: [{
    category: 'movies',
    img: "http://lorempixel.com/100/100",
    originaltitle: 'Harry Potter and the Sorcerers Stone',
    releasedate: '2001',
    overview: 'Magical story of a boy who discovers he is a wizard!',
    voteaverage: '4.5 / 5'
    }
    // another movie object here
  ],
  dataBooks: [{
      category: 'books',
      img: 'http://lorempixel.com/100/100',
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: '1925',
      genre: 'Fiction',
      synopsis: 'Epic story of the Raging Twenties'
    }
  ],
  dataPlaces: [{
    category: 'places',
    img: 'http://lorempixel.com/100/100',
    name: 'Juliette et Chocolat',
    location: '3600 boulevard Saint-Laurent',
    rating: 4.9,
    price: '$$'
    }
  ],
  dataProducts: [{
    img: 'http://lorempixel.com/100/100',
    category: 'products',
    name: 'Skates',
    description: 'Hockey essential'
    }
  ]
}

function createMovieItem (obj) {
  let newMovieItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">

              <img class="media-object" src="${dataBase.movie_image}" alt="image">


            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.originaltitle}</h4>
            <ul>
              <li class="releasedate">${obj.releasedate}</li>
              <li class="overview">${obj.overview}</li>
              <li class="voteaverage">${obj.voteaverage}</li>
            </ul>
          </div>
        </div>
      </div>
      </div>`
    return (newMovieItem);
  };

function createBookItem (obj) {
  let newBookItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${obj.img}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.name}</h4>
            <ul>
              <li class="author">${obj.author}</li>
              <li class="genre">${obj.genre}</li>
              <li class="synopsis">${obj.synopsis}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
    return (newBookItem);
  }

function createPlaceItem (obj) {
  let newPlaceItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${obj.img}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.name}</h4>
            <ul>
              <li class="location">${obj.location}</li>
              <li class="rating">${obj.rating}</li>
              <li class="price">${obj.price}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
    return (newPlaceItem);
  }

function createProductItem (obj) {
  let newProductItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${obj.img}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.name}</h4>
            <ul>
              <li class="description">${obj.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
    return (newProductItem);
  }

// last 2 divs close div class="movies" and div class="rows"

function renderMovieItem (dataObj) {
  // dataObj = dataObj.slice(0, 2);
  dataObj.forEach((obj, index) => {
    console.log(index);
    let movieItem = createMovieItem(obj);
    $(".container").append(movieItem);
  });
}

function renderBookItem (dataObj) {
  // dataObj = dataObj.slice(0, 2);
  dataObj.forEach((obj, index) => {
    console.log(index);
    let bookItem = createBookItem(obj);
    $(".container").append(bookItem);
  });
}

function renderPlaceItem (dataObj) {
  // dataObj = dataObj.slice(0, 2);
  dataObj.forEach((obj, index) => {
    console.log(index);
    let placeItem = createPlaceItem(obj);
    $(".container").append(placeItem);
  });
}

function renderProductItem (dataObj) {
  // dataObj = dataObj.slice(0, 2);
  dataObj.forEach((obj, index) => {
    console.log(index);
    let productItem = createProductItem(obj);
    $(".container").append(productItem);
  });
}

function loadToDoItems () {
  renderMovieItem(_viewModel.dataMovies);
  renderBookItem(_viewModel.dataBooks);
  renderPlaceItem(_viewModel.dataPlaces);
  renderProductItem(_viewModel.dataProducts);
};

// renderBookItem(dataBooks);
// renderProductItem(dataProducts);

  // $.ajax({
  //   type: "GET",
  //   url: '/movies',
  //   success: function(dataObj) {
  //     renderMovieItem(dataObj);
  //   })

loadToDoItems();


// will load from database
// function loadToDoItems () {
//   $.ajax({
//     type: "GET",
//     url: '/',
//     success: function(viewModel) {



//       renderMovieItem(viewModel.dataMovies);
//       renderPlaceItem(viewModel.dataPlaces);
//       // render etc etc
//     })
//   });

// addMovie() {
//   AJAX call
//   return fail or success with id of new object
//   add item to viewModel
// }


// };

});






// 4 AJAX requests in loadToDoItems
// point to renderToDO which points to a createtodo
// all of that gets rendered
//but 3 tabs are hiden and one is shown

// function createToDoItem ()

// function renderToDoItems (data) {
//   for (let item of data) {
//     console.log(data);
//     let $data =
//     }
// }



// // will load from database
// function loadToDoItems () {
//   $.ajax({
//     type: "GET",
//     url: '/movies',
//     success: function(dataObj) {
//       renderMovieItem(dataObj);
//     })
//   });

    // AJAX request I would like to go to url GET that info
    // AJAX request fetches data from the background (the server)
    // '/movies' goes to my server which references the API and comes back
    // server has exposed all of the possible paths to be called



// // Comment out all AJAX calls for now
//   $.ajax({
//     type: "GET",
//     url: '/books',
//     success: function(data) {
//       renderToDoItems(data);
//     })
//   });

//   $.ajax({
//     type: "GET",
//     url: '/books',
//     success: function(data) {
//       renderToDoItems(data);
//     })
//   });

//     $.ajax({
//     type: "GET",
//     url: '/books',
//     success: function(data) {
//       renderToDoItems(data);
//     })
//   });

// };

// end of commented out AJAX calls
//       renderMovieItem(data);
//     }
//   });

//   $.ajax({
//     type: "GET",
//     url: '/books',
//     success: function(data) {
//       renderToDoItems(data);
//     }
//   });

//   $.ajax({
//     type: "GET",
//     url: '/books',
//     success: function(data) {
//       renderToDoItems(data);
//     }
//   });

//     $.ajax({
//     type: "GET",
//     url: '/books',
//     success: function(data) {
//       renderToDoItems(data);
//     }
//   });
// };


// loadToDoItems(dataObj) // calls everything

// $(selector).hide(speed, callback);


// $("").click(fast, function() {
//   $("").
// }



  // '/todos/movies'
  // make 4 AJAX requests (within loadToDoItems):
  // movies, books, restaurants, products

  // right now: work on getting page to load
  // user's to do lists

// $().on("click")





  // $(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
  // $('body').append($('<h1>')).text('hello friend');
  // });
