$(document).ready(function() {

  $.ajax({
      method: "GET",
      url: "/api/users",

    }).done((result)=>{
      console.log(result);
      });


});
