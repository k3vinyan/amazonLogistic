$(function(){
  array = [];
  url = 'https://www.amazonlogistics.com/comp/packageSearch';
  string = '';

  $( document ).on('change',":input[type=checkbox]", function(){
    $(":input[type=checkbox]").click(function(){
      array.push($(this).closest('tr')[0].id.substring(4));
   });
 } );

 //append buttons
  $('#ShipmentSearchTable').prepend(
    createButton("atWrongStationButton", "At Wrong Station")
  );
  $('#ShipmentSearchTable').prepend(
    createButton("deliveryAttemptedButton", "Delivery Attempted")
  );
  $('#ShipmentSearchTable').prepend(
    createButton("departedForFCButton", "Departed For FC")
  );
  $("#ShipmentSearchTable").prepend(
    createButton("outForDeliveryButton", "Out For Delivery")
  );
  $('#ShipmentSearchTable').prepend(
    createButton("readyForFCButton", "Ready For FC")
  );
  $('#ShipmentSearchTable').prepend(
    createButton("readyForDepartureButton", "Ready For Departure")
  );
  $('#ShipmentSearchTable').prepend(
    createButton("newWindowButton", "Open New Window")
  );
  $('#ShipmentSearchTable').prepend(
    createButton("sameDayButton", "Same Day Packages")
  );


  //find functions
  $("#atWrongStationButton").click(function(){
    findAll("At Wrong Station");
  });
  $("#deliveryAttemptedButton").click(function(){
    findAll("Delivery Attempted");
  });
  $("#departedForFCButton").click(function(){
    findAll("Departed For FC");
  });
  $("#outForDeliveryButton").click(function(){
    findAll("Out For Delivery");
  });
  $("#readyForFCButton").click(function(){
    findAll("Ready For FC");
  });
  $("#readyForDepartureButton").click(function(){
    findAll("Ready for Departure");
  });
  $("#newWindowButton").click(function(){
    findAll("Ready for Departure");
  });
  $("#sameDayButton").click(function(){
    findSameDay();
  })





  function createButton(id, value, clas){
    var id = id;
    var value = value;
    var string;
    var clas;
    string = "<input id='" + id + "' type='button' value='" + value + "' ></button>";
    return string;

  };

  // function createButton(id, value, color, bgColor, padding){
  //   var id = id;
  //   var value = value;
  //   var color = color;
  //   var bgColor = bgColor;
  //   var padding = padding;
  //
  //   var string;
  //
  //   string = "<input id='" + id + "' type='button' value='" + value +
  //     "' style='" + color + "; " + "background-color:" + bgColor + "; " + "padding:" +
  //     padding + "';></button>";
  //
  //     console.log(string);
  //     return string;
  // };

  function findAll(status){
    var status;
    var even = $('.even');
    var odd = $('.odd');

    for(var i = 0; i < even.length; i++){
      if( (even[i].children[18].innerText) == status ){
        $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
    for(var i = 0; i < odd.length; i++){
      if( (odd[i].children[18].innerText) == status ){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }
  };

  function findSameDay(){
    var even = $('.even');
    var odd = $('.odd');

    for(var i = 0; i < even.length; i++){
      if(even[i].children[5].innerText === "Same"){
          $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
    for(var i = 0; i < odd.length; i++){
      if( (odd[i].children[18].innerText) == "Same" ){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }
  }



  function openNewWindow(){
    array = [];
    var even = $('.even');
    var odd = $('.odd');
    var input;


    for(var i =0; i < even.length; i++){
      if($(even[i].children[0].children[0]).is(':checked')){
        array.push(even[i].children[2].children[0].innerText);
      }
    }

    for(var i =0; i < odd.length; i++){
      if($(odd[i].children[0].children[0]).is(':checked')){
        array.push(odd[i].children[2].children[0].innerText);
      }
    }
    string = array.toString().replace(/,/g, "\n");
    input = prompt("Ctrl+C the TBAs:", string)
    if(input === null){
      return;
    }else {
      window.open(url, "", "width=1200");
    	return false;
    }
  }



  $('#clearButton').click(function(){
    array = [];
    string = "";
    console.log(array);
    searchRdyForDepart();
  });


  // $('#newWindowButton').click(function(){
  //   string = array.toString().replace(/,/g, " ");
  //   var input;
  //   input = prompt("Ctrl+C the TBAs:", string);
  //   if(input === null){
  //     return;
  //   }else {
  //     window.open(url, "", "width=1200");
  //   	return false;
  //   }
  // });
});
