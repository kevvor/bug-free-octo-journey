$(document).ready(function() {

  $('#amazonSearchForm').on('submit', function(event){
    event.preventDefault();
    let searchTerms = $('#amazonSearchText').val();
    console.log(searchTerms);

    $.ajax({
      method: "GET",
      url: "/amazonSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        console.log(result[0].LargeImage[0].URL[0]);
    })
  });

  $('#yelpSearchForm').on('submit', function(event){
    event.preventDefault();
    let searchTerms = $('#yelpSearchText').val();
    console.log(searchTerms);

    $.ajax({
      method: "GET",
      url: "/yelpSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        console.log(result.businesses[0]);
    })
  });

  $('#tmdbSearchForm').on('submit', function(event){
    event.preventDefault();
    let searchTerms = $('#tmdbSearchText').val();
    console.log(searchTerms);

    $.ajax({
      method: "GET",
      url: "/tmdbSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        console.log(result.results[0], result.results[1].title);
    })
  });

});
