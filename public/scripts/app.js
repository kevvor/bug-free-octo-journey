$(document).ready(function() {



// let database = response.rows[0];
// console.log(response)

function createMovieItem (obj) {
  let newMovieItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${obj.movie_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.movie_name}</h4>
            <ul>
              <li class="rating">${obj.movie_rating}</li>
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
              <img class="media-object" src="${obj.book_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.book_name}</h4>
            <ul>
              <li class="author">${obj.book_author}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
  return (newBookItem);
};

function createPlaceItem (obj) {
  let newPlaceItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${obj.place_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.place_name}</h4>
            <ul>
              <li class="address">${obj.place_address}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
  return (newPlaceItem);
};

function createProductItem (obj) {
  let newProductItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${obj.product_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${obj.product_name}</h4>
          </div>
        </div>
      </div>
    </div>`
  return (newProductItem);
};

$.ajax({
      method: "GET",
      url: "/api/users",
    }).done((response)=>{
        let userBookList = '';
        let userMovieList = '';
        let userProductList = '';
        let userPlaceList = '';
        if (response.booklist) userBookList = response.booklist.rows;
        if (response.movielist) userMovieList = response.movielist.rows;
        if (response.productlist) userProductList = response.productlist.rows;
        if (response.placelist) userPlaceList = response.placelist.rows;

        for (i in userBookList){
          let bookItem = createBookItem(userBookList[i]);
          $(".books-list").append(bookItem);
        };
        for (i in userMovieList){
          let movieItem = createMovieItem(userMovieList[i]);
          $(".movies-list").append(movieItem);
        };
        for (i in userProductList){
          let productItem = createProductItem(userProductList[i]);
          $(".products-list").append(productItem);
        };
        for (i in userPlaceList){
          let placeItem = createPlaceItem(userPlaceList[i]);
          $(".places-list").append(placeItem);
        };

        // let movieItem = createMovieItem(response[i]);
        // let bookItem = createBookItem(response[i]);
        // let productItem = createProductItem(response[i]);
        // let placeItem = createPlaceItem(response[i]);
        // $(".movies-list").append(movieItem);
        // $(".books-list").append(bookItem);
        // $(".places-list").append(placeItem);
        // $(".products-list").append(productItem);


});

// function renderMovieItem (dataObj) {
//   console.log('in movie render')
//   dataObj.forEach((obj, index) => {
//     let movieItem = createMovieItem(obj);
//     $(".movies-list").append(movieItem);
//   });
// }

// function renderBookItem (dataObj) {
//   dataObj.forEach((obj, index) => {
//     console.log(index);
//     let bookItem = createBookItem(obj);
//     $(".books-list").append(bookItem);
//   });
// }

// function renderPlaceItem (dataObj) {
//   dataObj.forEach((obj, index) => {
//     console.log(index);
//     let placeItem = createPlaceItem(obj);
//     $(".places-list").append(placeItem);
//   });
// }

// function renderProductItem (dataObj) {
//   dataObj.forEach((obj, index) => {
//     console.log(index);
//     let productItem = createProductItem(obj);
//     $(".products-list").append(productItem);
//   });
// }

// function renderToDoItems (database) {
//   renderMovieItem(database);
  // renderBookItem(database);
  // renderPlaceItem(database);
  // renderProductItem(database);
// };




// function loadToDoItems () {
//   $.ajax({
//     type: "GET",
//     url: '/api/users',
//     success: function(database) {
//       renderToDoItems(database);
//     }
//   });
// }




// loadToDoItems();

});

// $(selector).hide(speed, callback);

// $("").click(fast, function() {
//   $("").
// }
