var template, source;
var dataSet = [];
var dat;

function getEvents() {
  $('#spanStatus').text('Starting AJAX Call');
  $.ajax({
    crossDomain: true,
    type:"GET",
    contentType: "application/json; charset=utf-8",
    url: "http://py-eventlogger-ml3.appspot.com/mine3/default/eventList",
    dataType: "json",
    success: fillData,
    error: errorInfo
  });
}

function errorInfo(xhr, status, error) {
  $('#spanStatus').text('Error');
}

function fillData(data) {
  $('#spanStatus').text('Recieved Data');
  var iterator = 0;

  for(iterator = 0; iterator < data.data.length; iterator++) {
    //$('#data').append(data.data[iterator].eventType + '<br />')
    dat = data;
    $('#eventsList').append(template(data.data[iterator]));
  }
  $('#spanStatus').text('Finshed call').delay(3000).fadeOut(1000);
}

function insertDay(date, event, time, latitude, longitude) {
  if(date in dataSet) {

  }
  else {
    
  }
}