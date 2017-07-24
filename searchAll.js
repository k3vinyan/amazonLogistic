$(function(){


  var accept = new Audio('accept.wav');
  var buzzer = new Audio('buzzer.wav');

//counter for focusOn
var turnOn = false;
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
    optionButton('focusButton', 'FOCUS ON', '#FFFFFF', '#4c177d', '5px')
  );
  $('#ShipmentSearchTable').prepend(
    optionButton('sortRouteButton', 'SORT ROUTE', '#FFFFFF', '#3CB371', '5px')
  );
  $('#ShipmentSearchTable').prepend(
    optionButton('clearButton', ' CLEAR ', '#FFFFFF', '#cc1818', '5px')
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
  });
  $("#sameDayButton").click(function(){
    findSameDay();
  });
  $('#clearButton').click(function(){
    $('input:checkbox').removeAttr('checked');
  });
  $('#sortRouteButton').click(function(){
    alertCompanyWindow();
  });
  $('#focusButton').click(function(){
    focus();
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
    input = prompt("Ctrl + C to copy TBA(s)", string)
    if(input === null){
      return;
    }else {
      window.open(url, "Hello", "width=1200");
    	return false;
    }
  }

  function alertCompanyWindow(){
    array = SortVRoute();
    let string = "";

    for(var i = 0; i < array.length; i++){
      string += "Route: " + array[i].route +
                "   " + array[i].company + "\n"
    }
    alert(string);
  }

 $(':checkbox').change(function() {
    $("#clearButton").click(function(){
      $('input:checkbox').removeAttr('checked');
    });
  });

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

  function bubbleSort(arr){
   var len = arr.length;
   var num1 = 0;
   var num2 = 0;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       num1 = parseInt((arr[j-1]).route.replace(/\D/g, ""));
       num2 = parseInt((arr[j]).route.replace(/\D/g, ""));
       if( num1 > num2 ){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}

  function SortVRoute(){
    array = [];
    tempArray = [];

    var even = $('.even');
    var odd = $('.odd');
    var object = {};

    for(var i =0; i < even.length; i++){
      let r = even[i].children[16].innerText;
      let c = even[i].children[19].innerText;
      tempArray.push(object[i] = { route: r, company: c });
    }

    for(var i =0; i < odd.length; i++){
      let r = odd[i].children[16].innerText;
      let c = odd[i].children[19].innerText;
      tempArray.push(object[i] = { route: r, company: c });
    }

    array = bubbleSort(tempArray);
    return array;
  }

  function focus(){
      counter ++;
      truthValue = toggleOnOff(turnOn);
      console.log(truthValue);
      if(truthValue){
        $('#focusButton').attr('value', 'FOCUS ON');
        $('#focusButton').css('background-color', '#4C177D');
        $("#shipmentSearchIds").keydown(keydownHandler);
      } else {
          $('#focusButton').attr('value', 'FOCUS OFF');
          $('#focusButton').css('background-color', '#BDBDBD');
        $("#shipmentSearchIds").unbind('keydown', keydownHandler);
      }
  }

  var counter = 0;
  function toggleOnOff(){
    if(counter%2 == 0){
      onOff = true;
    }
    else if(counter%2 !== 0){
      onOff = false;
    }
    return onOff;
  }

  function keydownHandler(e){
    if(e.keyCode == 13){
      $("#searchSubmit").click();
    }
  }


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
