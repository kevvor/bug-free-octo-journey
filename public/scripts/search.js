$(document).ready(function() {



  function renderSuggestions(arrayToRender){
  $('.suggestions-field').find('.row')
    .append(
      $('<div/>').addClass("col-sm-4 suggestion")
        .append($('<h3/>').text(arrayToRender.name))
        .append($('<img/>').attr("src", arrayToRender.imgUrl1))
    )
    .append(
      $('<div/>').addClass("col-sm-4 suggestion")
        .append($('<h3/>').text(arrayToRender.name))
        .append($('<img/>').attr("src", arrayToRender.imgUrl2))
    )
    .append(
      $('<div/>').addClass("col-sm-4 suggestion")
        .append($('<h3/>').text(arrayToRender.name))
        .append($('<img/>').attr("src", arrayToRender.imgUrl3))
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
    let suggestions = {};
    let searchTerms = $('#amazonSearchText').val();
    suggestions['name'] = searchTerms;
    $.ajax({
      method: "GET",
      url: "/amazonSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{
        suggestions['imgUrl1'] = result[0].LargeImage[0].URL[0];
        suggestions['imgUrl2'] = result[1].LargeImage[0].URL[0];
        suggestions['imgUrl3'] = result[2].LargeImage[0].URL[0]
        renderSuggestions(suggestions);
        console.log(suggestions);
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
    let suggestions = {};
    let searchTerms = $('#tmdbSearchText').val();
    console.log(searchTerms);

    $.ajax({
      method: "GET",
      url: "/tmdbSearch",
      data: {"userinput":searchTerms}
    }).done((result)=>{

        console.log(result.results[0]);
        console.log(result.results[1]);
        console.log(result.results[2]);

    })
  });



  // function createTweetELement(userObj){
  //   $('.tweet-field').prepend(

  //     $('<section/>').addClass("existing-tweet")

  //       .prepend($('<footer/>').addClass("timestamp-footer").text(timeSince(userObj.created_at))
  //         .append($('<img/>').attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/1308-200.png" ).addClass("like").data("tweet_ID", userObj._id))
  //         .append($('<img/>').attr("src", "https://image.freepik.com/free-icon/retweet_318-11148.jpg" ))
  //         .append($('<img/>').attr("src", "http://simpleicon.com/wp-content/uploads/flag.png" ))
  //       )

  //       .prepend($('<article/>').addClass("tweet").text(userObj.content.text))

  //       .prepend($('<header/>').addClass("user-header")
  //         .append($('<img/>').attr("src", userObj.user.avatars.small))
  //         .append($('<h2/>').text(userObj.user.name))
  //         .append($('<span/>').text(userObj.user.handle))
  //       )


  //   );

  // };













  // let testVar = 'skates';
  // console.log(testVar);

  // client.itemSearch({
  //     Keywords: testVar,
  //     responseGroup: 'ItemAttributes,Offers,Images'
  //   }).then(function(results){
  //     console.log(results[0].LargeImage[0].URL[0])
  //   }).catch(function(err){
  //     console.log(err.Error[0].Message);
  //   });




});
