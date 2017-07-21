$(document).ready(function() {

let data = [{
    category: 'movies',
    img: "http://lorempixel.com/100/100",
    title: 'Harry Potter and the Sorcerers Stone',
    year: '2001',
    genre: 'Action',
    synopsis: 'A young boy becomes a wizard'
    }
];
//   {
//     category: 'books',
//     title: 'The Great Gatsby',
//     author: 'F. Scott Fitzgerald',
//     year: '1925',
//     genre: 'Ficiton',
//     synopsis: 'Epic story of the Raging Twenties'
//   },

//   {
//     category: 'restaurants',
//     title: 'Juliette et Chocolat',
//     address: '3600 boulevard Saint-Laurent',
//     foodtype: 'Crepes',
//     description: 'Delicious dessert and dinner crepes'
//   },

//     {
//     category: 'products',
//     title: 'Candles',
//     description: 'Failsafe for power outages'

//   }



// function createMovieItem (data) {
//   let $class =
//   let $dl = $("<dl").addClass("movies");
//   let $input = $("<input>").addClass("checkbox");
//   let $img = $("<img>").attr();
//   let $h4 = $("<h4>").text();
//   let $spanTitle = $("<span>").addClass("title");
//   let $spanGenre = $("<span>").addClass("genre");
//   let $spanYear = $("<span>").addClass("year");
//   let $spanSynopsis = $("<span>").addClass("synopsis");
//   return $div.append()
// };

function createMovieItem (obj) {
  let newMovieItem = `
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
            <h4 class="media-heading">${obj.title}</h4>
            <ul>
              <li class="title">${obj.title}</li>
              <li class="year">${obj.year}</li>
              <li class="genre">${obj.genre}</li>
              <li class="synopsis">${obj.synopsis}</li>
            </ul>
          </div>
        </div>
      </div>
      </div>`
    return (newMovieItem);
  }

// last 2 divs close div class="movies"
// close div class="rows"`

function renderMovieItem (dataObj) {
  // dataObj = dataObj.slice(0, 2);
  dataObj.forEach((obj, index) => {
    console.log(index);
    let movieItem = createMovieItem(obj);
    $(".movies-list").append(movieItem);
  });
}


function loadToDoItems () {
  renderMovieItem(data);
  // $.ajax({
  //   type: "GET",
  //   url: '/movies',
  //   success: function(dataObj) {
  //     renderMovieItem(dataObj);
  //   })
};



loadToDoItems();


});

// function createBookItem (data) {
//   let $dl = $("<dl").addClass("books");
//   let $input = $("<input>").addClass("checkbox");
//   let $img = $("<img>").attr();
//   let $h4 = $("<h4>").text();
//   let $spanTitle = $("<span>").addClass("title");
//   let $spanAuthor = $("<span>").addClass("author");
//   let $spanGenre = $("<span>").addClass("genre");
//   let $spanYear = $("<span>").addClass("year");
//   let $spanSynopsis = $("<span>").addClass("synopsis");
// };

// function createRestaurantItem (data) {
//   let $dl = $("<dl").addClass("restaurant");
//   let $input = $("<input>").addClass("checkbox");
//   let $img = $("<img>").attr();
//   let $h4 = $("<h4>").text();
//   let $spanTitle = $("<span>").addClass("title");
//   let $spanAddress= $("<span>").addClass("address");
//   let $spanFoodType = $("<span>").addClass("foodtype");
//   let $spanDescription= $("<span>").addClass("description");
// };

// function createProductItem (data) {
//   let $dl = $("<dl").addClass("product");
//   let $input = $("<input>").addClass("checkbox");
//   let $img = $("<img>").attr();
//   let $h4 = $("<h4>").text();
//   let $spanTitle = $("<span>").addClass("title");
//   let $spanDescription= $("<span>").addClass("description");
// };



// ^ functions look like that 2 for each ex: 2 for movies

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


<<<<<<< HEAD
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
=======
      renderMovieItem(data);
    }
  });

  $.ajax({
    type: "GET",
    url: '/books',
    success: function(data) {
      renderToDoItems(data);
    }
  });

  $.ajax({
    type: "GET",
    url: '/books',
    success: function(data) {
      renderToDoItems(data);
    }
  });

    $.ajax({
    type: "GET",
    url: '/books',
    success: function(data) {
      renderToDoItems(data);
    }
  });
};
>>>>>>> 484d1cdba6d390dc9911c827761476fffa184032

// loadToDoItems(dataObj) // calls everything

// $(selector).hide(speed, callback);

<<<<<<< HEAD
// $("").click(fast, function() {
//   $("").
// }
=======
$("").click(fast, function() {
  // $("").
})
>>>>>>> 484d1cdba6d390dc9911c827761476fffa184032

  // '/todos/movies'
  // make 4 AJAX requests (within loadToDoItems):
  // movies, books, restaurants, products

  // right now: work on getting page to load
  // user's to do lists

<<<<<<< HEAD
// $().on("click")

=======
$().on("click") {
>>>>>>> 484d1cdba6d390dc9911c827761476fffa184032



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
