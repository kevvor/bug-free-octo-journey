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
              <img class="media-object" src="${database.book_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${dataBase.book_name}</h4>
            <ul>
              <li class="author">${database.book_author}</li>
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
              <img class="media-object" src="${database.place_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${database.place_name}</h4>
            <ul>
              <li class="address">${database.place_address}</li>
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
              <img class="media-object" src="${database.product_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${database.product_name}</h4>
          </div>
        </div>
      </div>
    </div>`
  return (newProductItem);
};

function renderMovieItem (dataObj) {
  console.log('in movie render')
  dataObj.forEach((obj, index) => {
    let movieItem = createMovieItem(obj);
    $(".movies-list").append(movieItem);
  });
}

function renderBookItem (dataObj) {
  dataObj.forEach((obj, index) => {
    console.log(index);
    let bookItem = createBookItem(obj);
    $(".books-list").append(bookItem);
  });
}

function renderPlaceItem (dataObj) {
  dataObj.forEach((obj, index) => {
    console.log(index);
    let placeItem = createPlaceItem(obj);
    $(".places-list").append(placeItem);
  });
}

function renderProductItem (dataObj) {
  dataObj.forEach((obj, index) => {
    console.log(index);
    let productItem = createProductItem(obj);
    $(".products-list").append(productItem);
  });
}

function renderToDoItems (database) {
  renderMovieItem(database);
  renderBookItem(database);
  renderPlaceItem(database);
  renderProductItem(database);
};




// function loadToDoItems () {
//   $.ajax({
//     type: "GET",
//     url: '/api/users',
//     success: function(database) {
//       renderToDoItems(database);
//     }
//   });
// }

$.ajax({
      method: "GET",
      url: "/api/users",
    }).done((response)=>{

      let movieItem = createMovieItem(response);
      $(".movies-list").append(movieItem);
      console.log(response);

    });

// loadToDoItems();

});

// $(selector).hide(speed, callback);

// $("").click(fast, function() {
//   $("").
// }
