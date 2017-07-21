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



  function renderTmdb(apiInput, resultIndex){
    let baseUrl = "http://image.tmdb.org/t/p/w185"
    $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass("col-sm-4 suggestion")
        .append($('<h3/>').text(apiInput.results[resultIndex].title))
        .append($('<img/>').attr("src", `${baseUrl}${apiInput.results[resultIndex].poster_path}`)).append($('<br/>'))
        .append($('<span/>').text('testing1 testin testin')).append($('<br/>'))
        .append($('<span/>').text('testing2 testin testin')).append($('<br/>'))
        .append($('<span/>').text('testing3 testin testin'))
    )
  }



  $('#movie-tab-selector').on('click',function(){
    $('#tmdbSearchForm').show();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').hide();
  })

  $('#restaurant-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').hide();
    $('#yelpSearchForm').show();
  })

  $('#product-tab-selector').on('click',function(){
    $('#tmdbSearchForm').hide();
    $('#amazonSearchForm').show();
    $('#yelpSearchForm').hide();
  })



  $('#amazonSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestion').remove();
    let suggestions = {};
    let searchTerms = $('#amazonSearchText').val();
    suggestions['name1'] = searchTerms;
    suggestions['name2'] = searchTerms;
    suggestions['name3'] = searchTerms;
    $.ajax({
      method: "GET",
      url: "/amazonSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        suggestions['imgUrl1'] = result[0].LargeImage[0].URL[0];
        suggestions['imgUrl2'] = result[1].LargeImage[0].URL[0];
        suggestions['imgUrl3'] = result[2].LargeImage[0].URL[0]
        renderSuggestions(suggestions);

    })
  });

  $('#yelpSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestion').remove();
    let suggestions = {};
    let searchTerms = $('#yelpSearchText').val();

    $.ajax({
      method: "GET",
      url: "/yelpSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
      suggestions['name1'] = result.businesses[0].name
      suggestions['name2'] = result.businesses[1].name
      suggestions['name3'] = result.businesses[2].name
      suggestions['imgUrl1'] = result.businesses[0].image_url
      suggestions['imgUrl2'] = result.businesses[1].image_url
      suggestions['imgUrl3'] = result.businesses[2].image_url
      renderSuggestions(suggestions);

    })
  });

  $('#tmdbSearchForm').on('submit', function(event){
    event.preventDefault();
    $('.suggestion').remove();
    let suggestions = {};
    let searchTerms = $('#tmdbSearchText').val();

    $.ajax({
      method: "GET",
      url: "/tmdbSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        if (result.total_results <= 0) console.log('error')
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








