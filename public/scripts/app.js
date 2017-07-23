$(document).ready(function() {

let database = response.rows[0];

function createMovieItem (obj) {
  let newMovieItem = `
    <div class="rows">
      <div class="col-md-2>"</div>
        <div class="col-md-7">
        <div class="media">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${database.movie_image}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${database.movie_name}</h4>
            <ul>
              <li class="rating">${database.movie_rating}</li>
              <li class="voteaverage">${database.vote_average}</li>
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
  dataObj.forEach((obj, index) => {
    let movieItem = createMovieItem(obj);
    $(".container").append(movieItem);
  });
}

function renderBookItem (dataObj) {
  dataObj.forEach((obj, index) => {
    console.log(index);
    let bookItem = createBookItem(obj);
    $(".container").append(bookItem);
  });
}

function renderPlaceItem (dataObj) {
  dataObj.forEach((obj, index) => {
    console.log(index);
    let placeItem = createPlaceItem(obj);
    $(".container").append(placeItem);
  });
}

function renderProductItem (dataObj) {
  dataObj.forEach((obj, index) => {
    console.log(index);
    let productItem = createProductItem(obj);
    $(".container").append(productItem);
  });
}

function loadToDoItems () {
  renderMovieItem(database);
  renderBookItem(database);
  renderPlaceItem(database);
  renderProductItem(database);
};

loadToDoItems();



function loadToDoItems () {

  $.ajax({
    type: "GET",
    url: '/',
    success: function(database) {
      renderToDoItems(database);
    }
  });
}

});

// $(selector).hide(speed, callback);

// $("").click(fast, function() {
//   $("").
// }
