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


  $("ShipmentSearchTable").prepend(
    "<input id='findDelAttButton' type='button' value='Find All Delivery Attempted'" +
    "style='color:#FFFFFF; background-color:#990000; padding: 8px;'></button>"
  )

  $('#ShipmentSearchTable').prepend(
    "<input id='findFCButton' type='button' value='Return to FC'" +
    "style='color:#FFFFFF; background-color:#990000; padding: 8px;'></button>"
  );
  $('#ShipmentSearchTable').prepend(
    "<input id='findWSButton' type='button' value='Find At Wrong Station'" +
    "style='color:#FFFFFF; background-color:#990000; padding: 8px;'></button>"
  );
  $('#ShipmentSearchTable').prepend(
    "<input id='clearButton' type='button' value='Clear'" +
    "style='color:#FFFFFF; background-color:#990000; padding: 8px;'></button>"
  );
  // $('#ShipmentSearchTable').prepend(
  //   "<input id='newWindowButton' type='button' value='Open New Window'" +
  //   "style='color:#FFFFFF; background-color:#3232FF; padding: 8px;'></button>"
  // );
  $('#ShipmentSearchTable').prepend(
    createButton("newWindowButton", "Open New Window", "color:#FFFFFF", "#3232FF", "8px")
  );

  //find functions
  $("#findRFDButton").click(function(){
    findAll("Ready For FC Return");
  });
  $("#findWSButton").click(function(){
    findAll("At Wrong Station");
  });
  $("#findDelAttButton").click(function(){
    findAll("Ready for Departure");
  });

  function createButton(id, value, color, bgColor, padding){
    var id = id;
    var value = value;
    var color = color;
    var bgColor = bgColor;
    var padding = padding;

    var string;

    string = "<input id='" + id + "' type='button' value='" + value +
      "' style='" + color + "; " + "background-color:" + bgColor + "; " + "padding:" +
      padding + "';></button>";

      console.log(string);
      return string;
  };

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



  $('#clearButton').click(function(){
    array = [];
    string = "";
    console.log(array);
    searchRdyForDepart();
  });


  $('#newWindowButton').click(function(){
    string = array.toString().replace(/,/g, " ");
    var input;
    input = prompt("Ctrl+C the TBAs:", string);
    if(input === null){
      return;
    }else {
      window.open(url, "", "width=1200");
    	return false;
    }
  });
});
