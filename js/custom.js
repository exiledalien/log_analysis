var template, source;
var dataSet = [];
var keysSet = [];
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
    keysSet.push(date);
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

function generateTravelLengths() {
  var iterator = 0;
  var lengthSet = [];

  for(iterator = 0; iterator < dataSet.length; iterator++) {
    var itDate = keysSet[iterator];
  }
}

function createMonday() {
  $('#divMondaySpline').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function() {
                        return this.value +'°'
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: 'Tokyo',
                marker: {
                    symbol: 'square'
                },
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                    y: 26.5,
                    marker: {
                        symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
                    }
                }, 23.3, 18.3, 13.9, 9.6]
    
            }, {
                name: 'London',
                marker: {
                    symbol: 'diamond'
                },
                data: [{
                    y: 3.9,
                    marker: {
                        symbol: 'url(http://www.highcharts.com/demo/gfx/snow.png)'
                    }
                }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
}