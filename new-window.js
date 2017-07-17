$(function(){
  array = [];
  url = 'https://www.amazonlogistics.com/comp/packageSearch';

  $( document ).on('change',":input[type=checkbox]", function(){
    $(":input[type=checkbox]").click(function(){
      array.push($(this).closest('tr')[0].id.substring(4));
   });
  } )

  $('#ShipmentSearchTable').append(
    "<input id='newWindowButton' type='button' value='Open New Window'" +
    "style='color:#FFFFFF; background-color:#3232FF; padding: 8px;'></button>"
  );

  $('#newWindowButton').click(function(){
    string = array.toString().replace(/,/g, " ");
    prompt("Ctrl+C the TBAs:", string);
    window.open(url, "", "width=1200");
  	return false;
  });
});
