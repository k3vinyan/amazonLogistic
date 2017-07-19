$(function(){

 //append buttons to page
 $("#bodyContainer").before(
   "<div style='float:right; padding: -20px 30px 0 0; border-style: solid; border-color: #DDDDDD;'>" +
   optionButton("searchAllButton", " SEARCH ALL ", '#FFFFFF', "#698EDA", "3px") +
   createButton("atStationButton", "At Station") +
   createButton("delayedAtStationButton", "Delayed at Station / Hold for Redelivery") +
   createButton("atWrongStationButton", "Wrong Station") +
   createButton("deliveryAttemptedButton", "Delivery Attempted") +
   createButton("readyForFCButton", "Ready For FC") +
   createButton("outForDeliveryButton", "Out For Delivery") +
   createButton("readyForDepartureButton", "Ready For Departure") +
   createButton("sameDayButton", "Same Day") +
   "</div>"
  );
  $('#ShipmentSearchTable').prepend(
    optionButton('clearButton', ' CLEAR ', '#FFFFFF', '#e50000', '5px')
  );
  $('#ShipmentSearchTable').prepend(
    optionButton('newWindowButton', 'GET TBA(S)', '#FFFFFF', '#698EDA', '5px')
  );

  //find functions
  $("#atWrongStationButton").click(function(){
    findAll("At Wrong Station");
  });
  $("#atStationButton").click(function(){
    findAll("At Station");
  });
  $("#delayedAtStationButton").click(function(){
    findAll("Delayed at Station");
    findAll("Hold for Redelivery");
  })
  $("#deliveryAttemptedButton").click(function(){
    findAll("Delivery Attempted");
  });
  $("#outForDeliveryButton").click(function(){
    findAll("Out for Delivery");
  });
  $("#readyForFCButton").click(function(){
    findAll("Ready For FC Return");
  });
  $("#readyForDepartureButton").click(function(){
    findAll("Ready for Departure");
  });
  $("#newWindowButton").click(function(){
    openNewWindow();
    console.log("dog");
  });
  $("#sameDayButton").click(function(){
    findSameDay();
  });
  $('#clearButton').click(function(){
    $('input:checkbox').removeAttr('checked');
  });

  //create button function
  function createButton(id, value, clas){
    var id = id;
    var value = value;
    var string;
    var clas;
    var margin = "'margin-right: 5px;'"
    string = "<input id='" + id + "' type='button' value='" + value +
    "' style=" + margin +" ></button>";
    return string;
  };


  //method to checked all objeects with corresponding status
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

  //method to checked all sameDay
  function findSameDay(){
    var even = $('.even');
    var odd = $('.odd');

    for(var i = 0; i < even.length; i++){
      if(even[i].children[5].innerText === "Same"){
          $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
    for(var i = 0; i < odd.length; i++){
      if( (odd[i].children[5].innerText) == "Same" ){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }
  }

  //collects checked TBA and returns it to a prompt and launch new window
  function openNewWindow(){
    array = [];
    var even = $('.even');
    var odd = $('.odd');
    var input;
    url = 'https://www.amazonlogistics.com/comp/packageSearch';
    string = '';


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
 //
 // $(':checkbox').change(function() {
 //    $("#clearButton").click(function(){
 //      $('input:checkbox').removeAttr('checked');
 //    })
 //    console.log("dog");
 //  });

  //create button with additonal options
  function optionButton(id, value, color, bgColor, padding){
    var id = id;
    var value = value;
    var color = color;
    var bgColor = bgColor;
    var padding = padding;
    var string;

    string = "<input id='" + id + "' type='button' value='" + value +
      "' style='" +"color: " + color + "; " + "background-color:" + bgColor +
      "; " + "padding: " + padding + "; border-style: none;'></button>";

      return string;
  };

  //flex button work in process.......
  // $('#ShipmentSearchTable').append(
  //   optionButton("flexButton", "Convert to Flex", '#FFFFFF', "#CC0000", "5px")
  // );
  // $("#flexButton").click(function(){
  //   convertToFlex();
  // }).prop("disabled", true);
  //
  // function convertToFlex(){
  //   findAll("Ready for Departure");
  //   if($('input:checked').length > 3){
  //     $(":input[value=\"RollBack Status\"]").trigger("click");
  //   }
  // };

});
