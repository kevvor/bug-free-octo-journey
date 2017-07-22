$(document).ready(function() {



  // function renderSuggestions(arrayToRender){
  // $('.suggestions-field').find('.row')
  //   .append(
  //     $('<div/>').addClass("col-sm-4 suggestion")
  //       .append($('<h3/>').text(arrayToRender.name1))
  //       .append($('<img/>').attr("src", arrayToRender.imgUrl1)).append($('<br/>'))
  //       .append($('<span/>').text('testing1 testin testin')).append($('<br/>'))
  //       .append($('<span/>').text('testing2 testin testin')).append($('<br/>'))
  //       .append($('<span/>').text('testing3 testin testin'))
  //   )
  //   .append(
  //     $('<div/>').addClass("col-sm-4 suggestion")
  //       .append($('<h3/>').text(arrayToRender.name2))
  //       .append($('<img/>').attr("src", arrayToRender.imgUrl2))
  //       .append($('<span/>').text('testing1 testin testin'))
  //       .append($('<span/>').text('testing2 testin testin'))
  //       .append($('<span/>').text('testing3 testin testin'))
  //   )
  //   .append(
  //     $('<div/>').addClass("col-sm-4 suggestion")
  //       .append($('<h3/>').text(arrayToRender.name3))
  //       .append($('<img/>').attr("src", arrayToRender.imgUrl3))
  //       .append($('<span/>').text('testing testin testin'))
  //       .append($('<span/>').text('testing testin testin'))
  //       .append($('<span/>').text('testing testin testin'))
  //   )
  // }
  let testdb = []

  function renderTmdb(apiInput, resultIndex){
    let baseUrl = "http://image.tmdb.org/t/p/w185"
    let colClass = `col-sm-4 suggestion ${resultIndex}`
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h3/>').text(apiInput.results[resultIndex].title))
        .append($('<img/>').attr("src", `${baseUrl}${apiInput.results[resultIndex].poster_path}`)).append($('<br/>'))
        .append($('<span/>').text(`Released: ${apiInput.results[resultIndex].release_date}`)).append($('<br/>'))
        .append($('<span/>').text(`TMDB user rating: ${apiInput.results[resultIndex].vote_average}/10`))

    )
    $(`.suggestion.${resultIndex}`).on('click',function(){
      testdb = [];
      console.log(resultIndex);
      testdb.push(apiInput.results[resultIndex]);
      console.log(testdb)
    })

  }


  function renderYelp(apiInput, resultIndex){
    let colClass = `col-sm-4 suggestion ${resultIndex}`
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h3/>').text(apiInput.businesses[resultIndex].name))
        .append($('<img/>').attr("src", apiInput.businesses[resultIndex].image_url)).append($('<br/>'))
        .append($('<span/>').text(`Address: ${apiInput.businesses[resultIndex].location.address1}`)).append($('<br/>'))
        .append($('<span/>').text(`Yelp user rating: ${apiInput.businesses[resultIndex].rating}/10`))
    )
    $(`.suggestion.${resultIndex}`).on('click',function(){
      testdb = [];
      testdb.push(apiInput.businesses[resultIndex]);
      console.log(testdb)
    })

  }

  function renderAmazonProduct(apiInput, resultIndex, searchTerms){
    let colClass = `col-sm-4 suggestion ${resultIndex}`
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass(colClass)
        .append($('<h3/>').text(searchTerms))
        .append($('<img/>').attr("src", apiInput[resultIndex].LargeImage[0].URL[0])).append($('<br/>'))
        .append($('<span/>').text(apiInput[resultIndex].ItemAttributes[0].Title[0])).append($('<br/>'))
        .append($('<a/>').attr("href", apiInput[resultIndex].DetailPageURL[0]).text('Buy now on Amazon')).append($('<br/>'))
    )
    $(`.suggestion.${resultIndex}`).on('click',function(){
      testdb = [];
      console.log(resultIndex);
      testdb.push(apiInput[resultIndex]);
      console.log(testdb)
    })

  }


  $('#movie-tab-selector').on('click',function(){
    $('#tmdbSearchForm').show();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').hide();
    $('.suggestion').remove();
  })

  $('#restaurant-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').show();
    $('.suggestion').remove();
  })

  $('#product-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').show();
    $('#yelpSearchForm').hide();
    $('.suggestion').remove();
  })



  $('#amazonSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestion').remove();
    let searchTerms = $('#amazonSearchText').val();
    $.ajax({
      method: "GET",
      url: "/amazonSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
      if (result.length <= 0) console.log('No results found.')
      else if (result.length  < 3) {
        console.log('error')
        let emptyDivs = 3 - result.total_results;
        for (let i = 0; i < result.total_results; i++){
          renderAmazonProduct(result,i,searchTerms);
        }
        $('.suggestions-field').find('.row')
        .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
      }
      else{
        for (let i = 0; i < 3; i++){
          renderAmazonProduct(result, i, searchTerms);
        }
      }


    })
  });

  $('#yelpSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestion').remove();
    let searchTerms = $('#yelpSearchText').val();

    $.ajax({
      method: "GET",
      url: "/yelpSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
      console.log(result);
      if (result.total <= 0) console.log('No results found.')
      else if (result.total_results  < 3) {
        console.log('error')
        let emptyDivs = 3 - result.total_results;
        for (let i = 0; i < result.total_results; i++){
          renderYelp(result,i);
        }
        $('.suggestions-field').find('.row')
        .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
      }
      else{
        for (let i = 0; i < 3; i++){
          renderYelp(result, i)
        }
      }

    })
  });

  $('#tmdbSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestion').remove();

    let searchTerms = $('#tmdbSearchText').val();

    $.ajax({
      method: "GET",
      url: "/tmdbSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        if (result.total_results <= 0) console.log('No results found :(')
        else if (result.total_results  < 3) {
          console.log('error')
          let emptyDivs = 3 - result.total_results;
          for (let i = 0; i < result.total_results; i++){
            renderTmdb(result,i);
          }
          $('.suggestions-field').find('.row')
          .append($('<div/>').addClass(`col-sm-${emptyDivs*4} suggestion`))
        }
        else{
          for (let i = 0; i < 3; i++){
            renderTmdb(result, i)
          }
        }
    })
  });
});








