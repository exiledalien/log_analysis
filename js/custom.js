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
    dat = data;
    insertDayIntoDataSet(data.data[iterator]);
    //$('#eventsList').append(template(data.data[iterator]));
  }
  $('#spanStatus').text('Finshed call').delay(3000).fadeOut(1000);
}

function insertDayIntoDataSet(event) {
  $('#spanStatus').text('Parsing Data');
  insertDay(event.eventDate, event.eventType, event.eventTime, event.eventLatitude, event.eventLongitude, event.eventDayOfWeek);
  $('#spanStatus').text('Parsing finished').delay(3000).fadeOut(1000);
}

function insertDay(date, event, time, latitude, longitude, dayOfWeek) {
  if(date in dataSet) {
  }
  else {
    dataSet[date] = {};
  }
  dataSet[date][event] = time;
  dataSet[date][event + 'Lat'] = latitude;
  dataSet[date][event + 'Long'] = longitude;
  dataSet[date][event + 'Day'] = dayOfWeek;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};