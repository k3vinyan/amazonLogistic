$(function(){
  array = [];
  url = 'https://www.amazonlogistics.com/comp/packageSearch';
  string = '';

  $( document ).on('change',":input[type=checkbox]", function(){
    $(":input[type=checkbox]").click(function(){
      array.push($(this).closest('tr')[0].id.substring(4));
   });
 } );


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
  $('#ShipmentSearchTable').prepend(
    "<input id='newWindowButton' type='button' value='Open New Window'" +
    "style='color:#FFFFFF; background-color:#3232FF; padding: 8px;'></button>"
  );

  $("#findRFDButton").click(function(){
    findAll();
  });

  $("#findWSButton").click(function(){
    findAll();
  });


  function findAll(){
    var even = $('.even');
    var odd = $('.odd');

    for(var i = 0; i < even.length; i++){
      if( (even[i].children[18].innerText) == "At Wrong Station" ){
        $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
    for(var i = 0; i < odd.length; i++){
      if( (odd[i].children[18].innerText) == "At Wrong Station" ){
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
