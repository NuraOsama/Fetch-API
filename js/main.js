(function ($) { 
    "use strict";

   //preload
    var  mainStatus  = $('#status'),
     mainBody = $('body'),
     mainPreloader  = $('#preloader');

     window.onload = function() {
      mainStatus.fadeOut();
      mainPreloader.delay(500).fadeOut('slow');
      mainBody.delay(500).css({
          'overflow': 'visible'
      });
     }

     // Get Json Data && GRUD Operations
     var cityData, personData;
     $.when(
         $.getJSON('./json/city.json', function(data) {
             cityData = data;
         }),
         $.getJSON('./json/person.json', function(data) {
             personData = data;
         })
     ).then(function() {
     
         if (personData) {
             
              var person_data;
              var person_city; 
             $.each(personData, function(key, value){ 
                 person_city=value.city;
                 for ( var i = 0; i < cityData.length; i++ ) {
                 if (cityData[i].id == person_city) {
                     person_city = cityData[i].city;
                  }
                 }  
                 value.city=person_city;   
                 person_data +="<tbody>";
                 person_data +="<tr>";
                 person_data +="<td>"+value.id+"</td>";
                 person_data +="<td>"+value.first_name+"</td>";
                 person_data +="<td>"+value.last_name+"</td>";
                 person_data +="<td>"+value.email+"</td>";
                 person_data +="<td>"+value.job+"</td>";
                 person_data +="<td>"+value.city+"</td>";
                 person_data +="</tr>"; 
                 person_data +="</tbody>";
         });
         $('#example').append( person_data).SetEditable({ $addButton: $('#but_add')},
         );   
     
     }
         else {
             return false;
         }
     });


   //nice scroll
 $("body").niceScroll({
    scrollspeed: 80,
    cursorcolor:"#248dc1",
     cursorwidth:"9px",
     zindex: 50000,
      background:"#fcfcfc",
      cursorborder:"1px solid #248dc1",
})
})(jQuery);