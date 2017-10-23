$(function(){

    const accept = new Audio();
    const buzzer = new Audio();
    const choco  = new Audio();
    const flexAudio = new Audio();

    accept.src      = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WaE5GaXdScHNkRlk";
    buzzer.src      = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WQ2lOYVBPTmVLbWM";
    choco.src       = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WMEhrcGNSalAwMjQ";
    flexAudio.src   = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WZkpyekVGRGxuZm8";

    let today = new Date();
    let todayFormat = (today.getMonth()+1).toString() + "." + (today.getDay().toString()) + "." + (today.getFullYear().toString());


    //counter for focusOn
    var switchForFocus = false;
    var counterForFocus = 0;
    var switchForScanAll = false;
    var counterForScanAll = 0;
    var recordArray = [];

    //csv
    let headers = ["Departed To FC", "Milk Run", "FLEX"]
    let WTArray = [];
    let FCArray = [];
    let flexArray = [];
    let oneXArray = [];
    let othersArray = [];
    let firstSortArray = [];
    let secSortArray = [];
    let linkString = "<a href id='csvLink' download=" + todayFormat + ".csv" + " type='text/csv'>FLEX </a>"
    let backString = "<a href id='backLink' download=" + todayFormat + ".csv" + " type='text/csv'> SORT</a>"
   //append buttons to page
   $("#bodyContainer").before(
     "<div style='float:right; padding: -20px 30px 0 0; border-style: solid; border-color: #DDDDDD;'>" +
     optionButton("searchAllButton", " SEARCH ALL ", '#FFFFFF', "#698EDA", "3px") +
     createButton("betweenStation", "Between Station") +
     createButton("atStationButton", "At Station") +
     createButton("delayedAtStationButton", "Delayed at Station / Hold for Redelivery") +
     createButton("atWrongStationButton", "Wrong Station") +
     createButton("deliveryAttemptedButton", "Delivery Attempted") +
     createButton("readyForFCButton", "Ready For FC") +
     createButton("outForDeliveryButton", "Out For Delivery") +
     createButton("readyForDepartureButton", "Ready For Departure") +
     createButton("sameDayButton", "Same Day") +
     createButton("nonSameDayButton", "Non-Same Day") +
     createButton("noRouteButton", "No Route") +
     createButton("findRouteButton", "Find Route") +
     createButton("excludeRouteButton", "Exclude Route") +
     createButton("findStatus", "Find Status") +
     "</div>"
    );
    // $('#ShipmentSearchTable').prepend(
    //   optionButton('getRecordButton', 'GET FOCUS TBA', '#FFFFFF', '#BDBDBD', '5px')
    // );
    // $('#ShipmentSearchTable').prepend(
    //   optionButton('focusAllButton', 'FOCUS ALL OFF', '#FFFFFF', '#BDBDBD', '5px')
    // );

    $('#ShipmentSearchTable').prepend(
      backString
    );
    $('#ShipmentSearchTable').prepend(
      linkString
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('backButton', 'BACKTOSTATION', '#FFFFFF', '#BDBDBD', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('flexButton', 'FLEX', '#FFFFFF', '#BDBDBD', '5px')
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
    $("#nonSameDayButton").click(function(){
      findNonSameDay();
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
    $('#betweenStation').click(function(){
      getBetweenStation();
    });
    $('#findStatus').click(function(){
      getStatus();
    });
    $('#flexButton').click(function(){
      let that = $(this);
      runFlex(that);
    });
    $('#backButton').click(function(){
      backToStation();
      if($(this).css('background-color')=='rgb(189, 189, 189)'){
        $(this).css('background-color', '#336699');
        backToStation();
      } else {
         $(this).css('background-color', '#BDBDBD');
       }
    });
    $('#csvLink').click(function(e){
      runCSV();
    });
    $('#backLink').click(function(e){
      backCSV();
    });

  function backCSV(){
    let backHeaders = ['Wrong Station', 'FC Return', 'First Sort', 'Second Sort', 'One X Sort', 'Others'];
    var csv =   CSVcreatorOfSort(backHeaders, WTArray, FCArray, firstSortArray, secSortArray, oneXArray, othersArray);
    var data = new Blob([csv]);
    var a = document.getElementById("backLink");
    a.href = URL.createObjectURL(data);
  }
  function runCSV(){
    var csv = CSVcreator(headers, FCArray, WTArray, flexArray);
		var data = new Blob([csv]);
		var a = document.getElementById("csvLink");
		a.href = URL.createObjectURL(data);
  }


  function runFlex(that){
    if(that.css('background-color')=='rgb(189, 189, 189)'){
      that.css('background-color', '#336699');
      const search = prompt("Please enter the route to search", "V").toUpperCase();
      amazonFlex(search);
    } else {
       that.css('background-color', '#BDBDBD');
     }
  }

  function backToStation(){
    $('#shipmentSearchId').keydown(function(e){

      if(e.keyCode == 13){
        $("#shipmentSearchId").select();
        $("#searchSubmit").click(function(){
        });
        const searchInput = $(this);
        setTimeout(function(){
          $("#shipmentSearchId").select();
          const even = $('.even');
          const odd = $('.odd');

          const TBA = searchInput.val();
          setTimeout(function(){
            const status = odd[0].children[18].innerText;
            const reason = odd[0].children[17].innerText;
            const route = odd[0].children[16].innerText;
            const sortZone = odd[0].children[26].innerText.slice(0, 1);
            if(TBA.length <= 16){
              if(status === 'At Wrong Station' || status === 'Ready for Transfer'){
                WTArray.push(TBA);
                setTimeout(function(){
                  buzzer.play();
                }, 500)
              } else if(status === 'Rejected' || status == 'Departed For FC' || status == 'Ready For FC' || status == 'Ready For FC Return'){
               FCArray.push(TBA);
               setTimeout(function(){
                 choco.play();
               }, 500)
             } else if(sortZone === "B" || sortZone === "A"){
               firstSortArray.push(TBA)
                setTimeout(function(){
                  accept.play();
                }, 500)
              } else if(sortZone === "1" || sortZone === "2"){
                secSortArray.push(TBA)
                 setTimeout(function(){
                   accept.play();
                 }, 500)
              } else if(sortZone == "" || sortZone == undefined){
                oneXArray.push(TBA)
                 setTimeout(function(){
                   accept.play();
                 }, 500)
               } else{
                othersArray.push(TBA)
                flexAudio.play();
                flexArray.push(TBA);
              }
            }
          }), 1000;
        }, 1000);
      }
    })
  }

  function amazonFlex(search){
    $('#shipmentSearchId').keydown(function(e){

      if(e.keyCode == 13){
        $("#shipmentSearchId").select();
        $("#searchSubmit").click(function(){
        });
        const searchInput = $(this);
        setTimeout(function(){
          $("#shipmentSearchId").select();
          const even = $('.even');
          const odd = $('.odd');
          const TBA = searchInput.val();
          setTimeout(function(){
            const status = odd[0].children[18].innerText;
            const reason = odd[0].children[17].innerText;
            const route = odd[0].children[16].innerText;
            const routeStrip = route.replace(/\d/g,'');
            if(TBA.length <= 16){
              if(status === 'At Wrong Station' || status === 'Ready for Transfer'){
                WTArray.push(TBA);
                setTimeout(function(){
                  buzzer.play();
                }, 500)
              } else if(status === 'Rejected' || status === 'Departed For FC' || status === 'Ready For FC' || status == 'Ready For FC Return'){
               FCArray.push(TBA);
               setTimeout(function(){
                 choco.play();
               }, 500)
             } else if(search == routeStrip){
                setTimeout(function(){
                  accept.play();
                }, 500)
              } else{
                flexAudio.play();
                flexArray.push(TBA);
              }
            }
          }), 1000;
        }, 1000);
      }
    })
  }


  function CSVcreatorOfSort(head, wTArray, fCArray, firstSortArray, secSortArray, oneXArray, othersArray){

    let csvContent = "";

    for(let i = 0; i < head.length; i++){
      if(head.length-1 == i){
        csvContent += head[i] + "\n";
      } else {
        csvContent += head[i] + ",";
      }
    }


    const arrayOfArray = [wTArray, fCArray, firstSortArray, secSortArray, oneXArray, othersArray]

    let maxLoop = 0;

    for(let i = 0; i < arrayOfArray.length; i++){
      if(maxLoop == 0){
        maxLoop = arrayOfArray[i].length;
      } else {
        if(arrayOfArray[i].length > maxLoop){
          maxLoop = arrayOfArray[i].length;
        }
      }
    }

      console.log("maxLoop" + " " + maxLoop)

    for(let i = 0; i < maxLoop; i++){
      if(wTArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += wTArray[i] + ","
      }

      if(fCArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += fCArray[i] + ","
      }

      if(firstSortArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += firstSortArray[i] + ","
      }

      if(secSortArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += secSortArray[i] + ","
      }

      if(oneXArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += oneXArray[i] + ","
      }

      if(othersArray[i] == undefined){
        csvContent += "\n";
      } else{
        csvContent += othersArray[i] + "\n"
      }

    }
    return csvContent;
  }

  function CSVcreator(head, departedArray, wsArray, flexArray){

    let csvContent = "";

    for(let i = 0; i < head.length; i++){
      if(head.length-1 == i){
        csvContent += head[i] + "\n";
      } else {
        csvContent += head[i] + ",";
      }
    }
    let maxLoop = 0;

    if(departedArray.length > wsArray.length){
        if(departedArray.length > flexArray.length){
          maxLoop = departedArray.length;
        } else{
          maxLoop = flexArray.length;
        }
    } else if(wsArray.length > flexArray.length){
      maxLoop = wsArray.length;
    } else {
      maxLoop = flexArray.length;
    }

    for(let i = 0; i < maxLoop; i++){
      if(departedArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += departedArray[i] + ","
      }

      if(wsArray[i] == undefined){
        csvContent += " ,";
      } else{
        csvContent += wsArray[i] + ","
      }

      if(flexArray[i] == undefined){
        csvContent += "\n";
      } else{
        csvContent += flexArray[i] + "\n"
      }

    }
    return csvContent;
  }

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

    function findNonSameDay(){
      var even = $('.even');
      var odd = $('.odd');

      for(var i = 0; i < even.length; i++){
        if(even[i].children[5].innerText != "Same"){
            $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
      for(var i = 0; i < odd.length; i++){
        if( (odd[i].children[5].innerText) != "Same" ){
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
      string = array.toString().replace(/,/g, "\n ");
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
      let company = "";
      let compareCompany = "";

      for(var i = 0; i < array.length; i++){
        company = array[i].company.split("/")[1];
        if(compareCompany === "" || compareCompany === company) {
          compareCompany = company;
          string += "Route: " + array[i].route +
                    "   " + company + "\n"
        } else {
          compareCompany = company;
          string += "------------------------------------" + "\n" +
          "Route: " + array[i].route +
                    "   " + company + "\n"
        }

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
          var route = prompt("Please enter the route:", "Enter route here" );
          returnRoute(route);
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

    var focusRoute = ""
    function returnRoute(route){
      focusRoute = route;
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
          //recordTBA();
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
      checkStatus(focusRoute);
      let input = $("#shipmentSearchId").keypress();

      if(input[0].value.length == 15){
        recordArray.push(input[0].value);
      }
        arrayNotEmpty();
    }

    function getRecord(){
      url = 'https://www.amazonlogistics.com/comp/packageSearch';
      string = recordArray.toString().replace(/,/g, "\n ");
      input = prompt("Ctrl + C to copy TBA(s) | Press CLEAR to reset TBAs", string)
      if(input === null){
        return;
      }else {
        window.open(url, "width=1200");
        return false;
      }
    };

    function checkStatus(routeToSearch){
      let routeSearch = routeToSearch;
      let odd = $('.odd');
      let status = odd[0].children[18].innerText;
      let route = odd[0].children[16].innerText.replace(/[0-9]/g, '').toLowerCase();
      if( status === "Between FC and Stations" || status === "At Station" || status === "Delayed at Station" || status === "Between Stations"){
        if (route === routeSearch.toLowerCase()) {
          setTimeout(function(){
            accept.play();
          }, 1000);
        }
      } else {
        setTimeout(function(){
          buzzer.play();
        }, 1000);
      }
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
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }

      for(let i = 0; i < even.length; i++){
        route = even[i].children[16].innerText;
        if(!reg.test(route) && even[i].children[16].innerText != '\xa0'){
          $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
    }


    function getBetweenStation(){
      let even = $('.even');
      let odd = $('.odd');
      let status = "";
      //let status = odd[0].children[18].innerText;

      for(var i= 0; i < even.length; i++){
        status = even[i].children[18].innerText;
        if( status === "Between FC and Stations" || status === "Between Stations"){
            $(even[i].children[0].children[0]).attr('checked', true);
        }
      }

      for(var i = 0; i < odd.length; i++){
        status = odd[i].children[18].innerText;
        if( status === "Between FC and Stations" || status === "Between Stations"){
            $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }

    };

    function getStatus(){
      let odd = $('.odd');
      let even = $('.even');
      let route = "";
      let searchStatus = prompt("Enter Status to Search:", "Enter Status here");
      let reg = new RegExp(searchStatus);

      for(let i = 0; i < odd.length; i++){
        status = odd[i].children[18].innerText.toLowerCase();
        console.log(status);
        console.log(reg);
        if(reg.test(status)){
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }

      for(let i = 0; i < even.length; i++){
        status = even[i].children[18].innerText.toLowerCase();
        if(reg.test(status)){
          $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
    };

    $("img").click(function(){
      window.open("https://amazon-flex.herokuapp.com/");
    });

});
