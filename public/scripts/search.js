$(document).ready(function() {



  function renderTmdb(apiInput, resultIndex){
    let baseUrl = "http://image.tmdb.org/t/p/w185"
    let colClass = `col-sm-4 suggestion ${resultIndex}`
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h4/>').text(apiInput.results[resultIndex].title))
        .append($('<img/>').attr("src", `${baseUrl}${apiInput.results[resultIndex].poster_path}`)).append($('<br/>'))
        .append($('<span/>').text(`Released: ${apiInput.results[resultIndex].release_date}`)).append($('<br/>'))
        .append($('<span/>').text(`TMDB user rating: ${apiInput.results[resultIndex].vote_average}/10`))
        .append($('<button/>').addClass('btn pin btn-default').text('Pin this movie!'))
    )
    $(`.suggestion.${resultIndex}`).find('button').on('click',function(){
      let poster_URL = `${baseUrl}${apiInput.results[resultIndex].poster_path}`
      $.ajax({
        method: "POST",
        url: "/api/users",
        data: {"category": "movie",
               "title": apiInput.results[resultIndex].title,
               "img": poster_URL,
               "rating":apiInput.results[resultIndex].vote_average
        }
      })
    $('.suggestions-field').slideUp();
    $(".movies-list").append(
       `<div class="rows">
        <div class="media"  data-category = "movie">
          <div class="media-left" "media-middle">
            <a href="#"">
              <img class="media-object" src="${poster_URL}" alt="image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${apiInput.results[resultIndex].title}</h4>
            <ul>
              <li class="rating">${apiInput.results[resultIndex].vote_average}</li>
            </ul>
          </div>
        </div>
        <button type="delete" value="delete" class="btn btn-danger">delete</button>
      </div>
      `
    );

    })
  }


  function renderYelp(apiInput, resultIndex){
    let colClass = `col-sm-4 suggestion ${resultIndex}`
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h4/>').text(apiInput.businesses[resultIndex].name))
        .append($('<img/>').attr("src", apiInput.businesses[resultIndex].image_url)).append($('<br/>'))
        .append($('<span/>').text(`Address: ${apiInput.businesses[resultIndex].location.address1}`)).append($('<br/>'))
        .append($('<span/>').text(`Yelp user rating: ${apiInput.businesses[resultIndex].rating}/5`))
        .append($('<button/>').addClass('btn pin btn-default').text('Pin to place'))
    )
    $(`.suggestion.${resultIndex}`).find('button').on('click',function(){
      $.ajax({
        method: "POST",
        url: "/api/users",
        data: {"category": "place",
               "title": apiInput.businesses[resultIndex].name,
               "img": apiInput.businesses[resultIndex].image_url,
               "address": apiInput.businesses[resultIndex].location.address1
        }
      })
    })
  }

  function renderAmazonProduct(apiInput, resultIndex, searchTerms){
    let colClass = `col-sm-4 suggestion ${resultIndex}`
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h4/>').text(searchTerms))
        .append($('<img/>').attr("src", apiInput[resultIndex].LargeImage[0].URL[0])).append($('<br/>'))
        .append($('<span/>').text(apiInput[resultIndex].ItemAttributes[0].Title[0])).append($('<br/>'))
        .append($('<a/>').attr("href", apiInput[resultIndex].DetailPageURL[0]).text('Buy now on Amazon')).append($('<br/>'))
        .append($('<button/>').addClass('btn btn-default').text('Pin to shopping list'))
    )
    $(`.suggestion.${resultIndex}`).find('button').on('click',function(){
      $.ajax({
        method: "POST",
        url: "/api/users",
        data: {"category": "product",
               "title": searchTerms,
               "img": apiInput[resultIndex].LargeImage[0].URL[0]
        }
      })
    })
  }

  function renderGoogleBooks(apiInput, resultIndex){
    let colClass = `col-sm-4 suggestion ${resultIndex}`;
    let authorList = '';
    for ( let i in apiInput[resultIndex].authors){
      if (i == 0) {authorList += apiInput[resultIndex].authors[i]}
      else {authorList += `, ${apiInput[resultIndex].authors[i]}`}

    }
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h4/>').text(apiInput[resultIndex].title))
        .append($('<img/>').attr("src", apiInput[resultIndex].thumbnail)).append($('<br/>'))
        .append($('<span/>').text(`Author(s): ${authorList}`)).append($('<br/>'))
        .append($('<span/>').text(`Google books user rating: ${apiInput[resultIndex].averageRating}/5`))
        .append($('<button/>').addClass('btn btn-default').text('Pin to reading list'))
    )
    $(`.suggestion.${resultIndex}`).find('button').on('click',function(){
      console.log(apiInput[resultIndex].title)
      $.ajax({
        method: "POST",
        url: "/api/users",
        data: {"category": "book",
               "title": apiInput[resultIndex].title,
               "img": apiInput[resultIndex].thumbnail,
               "author": authorList
        }
      })
    })
  }



  $('#movie-tab-selector').on('click',function(){
    $('#tmdbSearchForm').show();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').hide();
    $('#googleBooksSearchForm').hide();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();

    $('.movies-list').show();
    $('.books-list').hide();
    $('.places-list').hide();
    $('.products-list').hide();



  })

  $('#restaurant-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').show();
    $('#googleBooksSearchForm').hide();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();

    $('.movies-list').hide();
    $('.books-list').hide();
    $('.places-list').show();
    $('.products-list').hide();
  })

  $('#product-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').show();
    $('#yelpSearchForm').hide();
    $('#googleBooksSearchForm').hide();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();

    $('.movies-list').hide();
    $('.books-list').hide();
    $('.places-list').hide();
    $('.products-list').show();
  })

  $('#book-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').hide();
    $('#googleBooksSearchForm').show();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();

    $('.movies-list').hide();
    $('.books-list').show();
    $('.places-list').hide();
    $('.products-list').hide();
  })



  $('#amazonSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();
    let searchTerms = $('#amazonSearchText').val();
    $.ajax({
      method: "GET",
      url: "/amazonSearch",
      timeout: 5000,
      data: {"userinput":searchTerms}
    }).done((result)=>{
      if (result.length <= 0){
        console.log('No results found.')
        $('.suggestions-field').find('.row')
        .append($('<div/>').addClass(`class="alert alert-danger" suggestion`))
        $('.suggestions-field').slideDown();
      }
      else if (result.length  < 3) {
        let emptyDivs = 3 - result.total_results;
        for (let i = 0; i < result.total_results; i++){
          renderAmazonProduct(result, i, searchTerms);
        }
        $('.suggestions-field').find('.row')
        .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
        $('.suggestions-field').slideDown();
      }
      else{
        for (let i = 0; i < 3; i++){
          renderAmazonProduct(result, i, searchTerms);
        }
        $('.suggestions-field').slideDown();
        console.log(result)
      }


    })
  });

  $('#yelpSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();
    let searchTerms = $('#yelpSearchText').val();

    $.ajax({
      method: "GET",
      url: "/yelpSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
      if (result.total <= 0) {
        console.log('No results found.')
        $('.suggestions-field').find('.row')
        .append($('<div/>').addClass('alert alert-danger suggestion').text('No Results Found'))
        $('.suggestions-field').slideDown();
      }
      else if (result.total_results  < 3) {
        let emptyDivs = 3 - result.total_results;
        for (let i = 0; i < result.total_results; i++){
          renderYelp(result,i);
        }
        $('.suggestions-field').find('.row')
        .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
        $('.suggestions-field').slideDown();
      }
      else{
        for (let i = 0; i < 3; i++){
          renderYelp(result, i)
          $('.suggestions-field').slideDown();
        }
      }

    })
  });

  $('#tmdbSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();

    let searchTerms = $('#tmdbSearchText').val();

    $.ajax({
      method: "GET",
      url: "/tmdbSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        if (result.total_results <= 0){
          console.log('No results found.')
          $('.suggestions-field').find('.row')
          .append($('<div/>').addClass('alert alert-danger suggestion').text('No Results Found'))
          $('.suggestions-field').slideDown();
        }
        else if (result.total_results  < 3) {
          let emptyDivs = 3 - result.total_results;
          for (let i = 0; i < result.total_results; i++){
            renderTmdb(result,i);
          }
          $('.suggestions-field').find('.row')
          .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
          $('.suggestions-field').slideDown();
        }
        else{
          for (let i = 0; i < 3; i++){
            renderTmdb(result, i)
            $('.suggestions-field').slideDown();
          }
        }
    })
  });

  $('#googleBooksSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestions-field').slideUp();
    $('.suggestion').remove();
    let searchTerms = $('#googleBooksSearchText').val();
    $.ajax({
      method: "GET",
      url: "/googleBooksSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
          if (result.length <= 0){
          console.log('No results found.')
          $('.suggestions-field').find('.row')
          .append($('<div/>').addClass('alert alert-danger suggestion').text('No Results Found'))
          $('.suggestions-field').slideDown();
        }
        else if (result.length  < 3) {
          let emptyDivs = 3 - result.total_results;
          for (let i = 0; i < result.total_results; i++){
            renderGoogleBooks(result,i);
          }
          $('.suggestions-field').find('.row')
          .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
          $('.suggestions-field').slideDown();
        }
        else{
          for (let i = 0; i < 3; i++){
            renderGoogleBooks(result, i)
            $('.suggestions-field').slideDown();
          }
        }
    })
  });
});








