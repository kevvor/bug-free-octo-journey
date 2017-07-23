$(document).ready(function() {

  $.ajax({
      method: "GET",
      url: "/api/users",
    }).done((response)=>{
      console.log(response);
      let movieItem = createMovieItem(response);
      $(".container").append(movieItem);
      console.log(response);
      });


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

});
