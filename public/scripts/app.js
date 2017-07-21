$(document).on("ready", function () {

let data = [{
    category: 'movies',
    title: 'Harry Potter and the Sorcerers Stone',
    year: '2001',
    genre: 'Action',
    synopsis: 'A young boy becomes a wizard'
  },

  {
    category: 'books',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: '1925',
    genre: 'Ficiton',
    synopsis: 'Epic story of the Raging Twenties'
  },

  {
    category: 'restaurants',
    title: 'Juliette et Chocolat',
    address: '3600 boulevard Saint-Laurent',
    foodtype: 'Crepes',
    description: 'Delicious dessert and dinner crepes'
  },

    {
    category: 'product',
    title: 'Candles',
    description: 'Failsafe for power outages'

  }

];

function createMovieItem (data) {
  let $dl = $("<dl").addClass("movies");
  let $input = $("<input>").addClass("checkbox");
  let $img = $("<img>").attr();
  let $h4 = $("<h4>").text();
  let $spanTitle = $("<span>").addClass("title");
  let $spanGenre = $("<span>").addClass("genre");
  let $spanYear = $("<span>").addClass("year");
  let $spanSynopsis = $("<span>").addClass("synopsis");
  return $div.append()
};

function createBookItem (data) {
  let $dl = $("<dl").addClass("books");
  let $input = $("<input>").addClass("checkbox");
  let $img = $("<img>").attr();
  let $h4 = $("<h4>").text();
  let $spanTitle = $("<span>").addClass("title");
  let $spanAuthor = $("<span>").addClass("author");
  let $spanGenre = $("<span>").addClass("genre");
  let $spanYear = $("<span>").addClass("year");
  let $spanSynopsis = $("<span>").addClass("synopsis");
};

function createRestaurantItem (data) {
  let $dl = $("<dl").addClass("restaurant");
  let $input = $("<input>").addClass("checkbox");
  let $img = $("<img>").attr();
  let $h4 = $("<h4>").text();
  let $spanTitle = $("<span>").addClass("title");
  let $spanAddress= $("<span>").addClass("address");
  let $spanFoodType = $("<span>").addClass("foodtype");
  let $spanDescription= $("<span>").addClass("description");
};

function createProductItem (data) {
  let $dl = $("<dl").addClass("product");
  let $input = $("<input>").addClass("checkbox");
  let $img = $("<img>").attr();
  let $h4 = $("<h4>").text();
  let $spanTitle = $("<span>").addClass("title");
  let $spanDescription= $("<span>").addClass("description");
};



// ^ functions look like that 2 for each ex: 2 for movies

// 4 AJAX requests in loadToDoItems
// point to renderToDO which points to a createtodo
// all of that gets rendered
//but 3 tabs are hiden and one is shown

// function createToDoItem ()

function renderToDoItems (data) {
  for (let item of data) {
    console.log(data);
    let $data =
    $()
  }
}



// will load from database
function loadToDoItems () {
  $.ajax({
    type: "GET",
    url: '/movies',
    // AJAX request I would like to go to url GET that info
    // AJAX request fetches data from the background (the server)
    // '/movies' goes to my server which references the API and comes back
    // server has exposed all of the possible paths to be called
    success: function(data) {


      renderMovieItem(data);
    })
  });

  $.ajax({
    type: "GET",
    url: '/books',
    success: function(data) {
      renderToDoItems(data);
    })
  });

  $.ajax({
    type: "GET",
    url: '/books',
    success: function(data) {
      renderToDoItems(data);
    })
  });

    $.ajax({
    type: "GET",
    url: '/books',
    success: function(data) {
      renderToDoItems(data);
    })
  });

};

loadToDoItems() // calls everything

$(selector).hide(speed, callback);

$("").click(fast, function() {
  $("").
}

  // '/todos/movies'
  // make 4 AJAX requests (within loadToDoItems):
  // movies, books, restaurants, products

  // right now: work on getting page to load
  // user's to do lists

$().on("click")

}


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
