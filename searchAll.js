$(function(){

  $(".legal-text").click(function(){
    let access = prompt();

    if(access === "password1234"){
      startup();
      console.log("starting up");
    } else {
      console.log("incorrect");
    }
  })

  function startup(){
    var accept = new Audio();
    var buzzer = new Audio();

    accept.src = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WMVhGcGJDR29xR0E";
    buzzer.src = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WZ3l3V2NJeDdWMDg";

    //counter for focusOn
    var switchForFocus = false;
    var counterForFocus = 0;

    var switchForScanAll = false;
    var counterForScanAll = 0;

    var recordArray = [];

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
     createButton("noRouteButton", "No Route") +
     createButton("findRouteButton", "Find Route") +
     createButton("excludeRouteButton", "Exclude Route") +
     "</div>"
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('getRecordButton', 'GET FOCUS TBA', '#FFFFFF', '#BDBDBD', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('focusAllButton', 'FOCUS ALL OFF', '#FFFFFF', '#BDBDBD', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('focusButton', 'FOCUS ONE OFF', '#FFFFFF', '#BDBDBD', '5px')
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
      recordArray = [];
      arrayNotEmpty();
    });
    $('#sortRouteButton').click(function(){
      alertCompanyWindow();
    });
    $('#focusButton').click(function(){
      focus();
    });
    $('#focusAllButton').click(function(){
      scanAll();
    });
    $('#getRecordButton').click(function(){
      getRecord();
    });
    $('#noRouteButton').click(function(){
      getAllNoRoute();
    });
    $("#findRouteButton").click(function(){
      findRoute();
    })
    $('#excludeRouteButton').click(function(){
      getExcludeRoute();
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

    function flex(){
      var even = $('.even');
      var odd = $('.odd');

      console.log((even[0].children[18].innerText));
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
        counterForFocus ++;
        truthValue = toggleOnOff(counterForFocus, switchForFocus);
        if(truthValue){
          $('#focusButton').attr('value', 'FOCUS ONE ON');
          $('#focusButton').css('background-color', '#4C177D');
          $("#shipmentSearchId").keydown(keydownHandler);
          $("#shipmentSearchIds").keydown(keydownHandler);
        } else {
          $('#focusButton').attr('value', 'FOCUS ONE OFF');
          $('#focusButton').css('background-color', '#BDBDBD');
          $("#shipmentSearchId").unbind('keydown', keydownHandler);
          $("#shipmentSearchIds").keydown(keydownHandler);
        }
    }

    function toggleOnOff(counter, switcher){
      if(counter%2 == 0){
        switcher = true;
      }
      else if(counter%2 !== 0){
        switcher = false;
      }
      return switcher;
    }

    function keydownHandler(e){

      if(e.keyCode == 13){
        $("#shipmentSearchId").select();
        $("#searchSubmit").click(function(){
        });
        setTimeout(function(){
          $("#shipmentSearchId").select();
          recordTBA();
        }, 1000);
      }

    };

   function keydownhandler2(e){
     if(e.keyCode == 13){
       $("#searchSubmit").click();
       setTimeout(function(){
         $("#shipmentSearchIds").focus();
       }, 1000);
     }
   };

    function scanAll(){
      counterForScanAll++;

      truthValue = toggleOnOff(counterForScanAll, switchForFocus);
      if(truthValue){
        $('#focusAllButton').attr('value', 'FOCUS ALL ON');
        $('#focusAllButton').css('background-color', '#4C177D');
        $("#shipmentSearchIds").keydown(keydownhandler2);
      } else {
        $('#focusAllButton').attr('value', 'FOCUS ALL OFF');
        $('#focusAllButton').css('background-color', '#BDBDBD');
        $("#shipmentSearchIds").keydown(keydownhandler2);
      }
    }

    function arrayNotEmpty(){
      if(recordArray.length > 0){
        $('#getRecordButton').css('background-color', '#CF3523');
      } else {
        $('#getRecordButton').css('background-color', '#BDBDBD');
      }
    }

    function recordTBA(){
      checkStatus();
      let input = $("#shipmentSearchId").keypress();

      if(input[0].value.length == 15){
        recordArray.push(input[0].value);
      }
        arrayNotEmpty();
    }

    function getRecord(){
      url = 'https://www.amazonlogistics.com/comp/packageSearch';
      string = recordArray.toString().replace(/,/g, "\n");
      input = prompt("Ctrl + C to copy TBA(s) | Press CLEAR to reset TBAs", string)
      if(input === null){
        return;
      }else {
        window.open(url, "width=1200");
        return false;
      }
    };

    function checkStatus(){
      let odd = $('.odd');
      let status = odd[0].children[18].innerText;
      let route = odd[0].children[16].innerText.replace(/[0-9]/g, '');
      if( status === "Between FC and Stations" || status === "At Station"){
        if (route === "V") {
          accept.play();
        }
      } else {
        buzzer.play();
      }
    }

    function checkStatus2(){

    }

    function getAllNoRoute(){
      let odd = $('.odd');
      let even = $('.even');

      for(let i = 0; i < odd.length; i++){
        if(odd[i].children[16].innerText === '\xa0'){
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }

      for(let i = 0; i < even.length; i++){
        if(even[i].children[16].innerText === '\xa0'){
          $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
    }

    function findRoute(){
      let odd = $('.odd');
      let even = $('.even');
      let route = "";
      let searchRoute = prompt("Enter Route to exclude:", "Enter Route here");
      let reg = new RegExp("[" + searchRoute + "]\\d+");

      for(let i = 0; i < odd.length; i++){
        route = odd[i].children[16].innerText;
        if(reg.test(route)){
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }

      for(let i = 0; i < even.length; i++){
        route = even[i].children[16].innerText;
        if(reg.test(route)){
          $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
    }

    function getExcludeRoute(){
      let odd = $('.odd');
      let even = $('.even');
      let route = "";
      let searchRoute = prompt("Enter Route to exclude:", "Enter Route here");
      let reg = new RegExp("[" + searchRoute + "]\\d+");

      for(let i = 0; i < odd.length; i++){
        route = odd[i].children[16].innerText;
        if(!reg.test(route) && odd[i].children[16].innerText != '\xa0'){
          console.log(odd[i].children[16].innerText)
          console.log(!(odd[i].children[16].innerText));
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }

      for(let i = 0; i < even.length; i++){
        route = even[i].children[16].innerText;
        if(!reg.test(route) && even[i].children[16].innerText != '\xa0'){
          console.log(odd[i].children[16].innerText)
          console.log(even[i].children[16].innerText);
          $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
    }



    $("img").click(function(){
      window.open("https://amazon-flex.herokuapp.com/");
    });
  }




});
