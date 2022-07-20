var APIKey = "9c2f191921ea4a448012e7d41b8872c0";
var city = $("#city");
var lat;
var lon;
var queryUrlCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
var queryUrlLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + APIKey + "&units=imperial";
var searchBtn = $("#searchbtn").click(getApiCity);
var listCity = $('#listcity');

var responseText = document.getElementById('response-text');


function getApiCity() {
    city = $("#city").val()
    var queryUrlCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    console.log(queryUrlCity)
    fetch(queryUrlCity)
    .then(function (response) {
        console.log (response);
        return response.json();
    })
    .then(function (data) {
        var lat = (data.coord.lat);
        var lon = (data.coord.lon);
        var imgEl = $('<img />',
            {id: "img",
             src: "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
             width: 200
            })
        imgEl.appendTo($('#location'));
        console.log(imgEl);
        //console.log(lat); console.log(data); console.log(lon);
        $('#location').text(data.name + " " + moment().format("MM/DD/YYYY"));
        $('#temp').text('Temp: ' + data.main.temp + "°F");
        $('#wind').text('Wind: ' + data.wind.speed + " MPH");
        $('#humidity').text("Humidity: " + data.main.humidity + "%");
        getApiLatLon(lat, lon);
    },
    
)};

function getApiLatLon(lat, lon) {
    queryUrlLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + APIKey + "&units=imperial";
    fetch(queryUrlLatLon)
    .then(function (response) {
        console.log (response);
        return response.json();
    })
    .then(function (data) {
        var uvi = data.current.uvi
        console.log(data)
        $('#currentday').show()
        $('#uvindex').text("UV Index: " + uvi)
        if (uvi <= 3) {
            console.log("low")
            $('#uvindex').css("background-color", "green");
            $('#uvindex').css("color", "white");
        } else if (uvi >= 6) {
            console.log("high")
            $('#uvindex').css("background-color", "red");
            $('#uvindex').css("color", "white");
        } else {
            console.log("medium")
            $('#uvindex').css("background-color", "yellow");
            $('#uvindex').css("color", "black");
        }
    }
)};












// init();
// function init(){
// var storedCity = JSON.parse(window.localStorage.getItem("SearchedCity")) || [];
// listCity.append('<li>' + storedCity + '</li>')
// }


// function cityInput(storedCity) {
//     for (var i = 0; i < storedCity.length; i++) {
//         listCity.append('<li>' + storedCity[i].City + '</li>')
//         city.val("") 
//     }
    
// }


// function displayCity() {
//     storedCity = JSON.parse(window.localStorage.getItem("SearchedCity")) || [];
//     cityVal = {
//         City: city.val()
//     }
//     storedCity.push(cityVal);
//     window.localStorage.setItem("SearchedCity", JSON.stringify(storedCity));
// cityInput(storedCity)
// }