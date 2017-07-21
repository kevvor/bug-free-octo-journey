// const secrets = require('../../secrets')
// const amazon = require('amazon-product-api');
// const client = amazon.createClient({
//   awsId: secrets.awsId,
//   awsSecret: secrets.awsSecret,
//   awsTag: secrets.awsTag
// });

$(document).ready(function() {

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
        console.log(result.results[0]);
    })
  });






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
