var APIKey = "9c2f191921ea4a448012e7d41b8872c0";
var searchBtn = $("#searchbtn");


searchBtn.click(getApiCity);


function getApiCity() {
    var city = $("#city").val();
    $('#fivedayforecast').empty();
    queryUrlCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // console.log(queryUrlCity)
    fetch(queryUrlCity)
    .then(function (response) {
        // console.log (response);
        return response.json();
    })
    .then(function (data) {
        var lat = (data.coord.lat);
        var lon = (data.coord.lon);
        var iconWeather = data.weather[0].icon
        var imgEl = $('<img />',
            {id: "img",
             src: "https://openweathermap.org/img/w/" + iconWeather + ".png",
             width: 50
            });
            // console.log(imgEl)
        //console.log(lat); console.log(data); console.log(lon);
        $('#location').text(data.name + " " + "(" + moment().format("MM/DD/YYYY") + ")");
        $('#location').append(imgEl);
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
        // console.log (response);
        return response.json();
    })
    .then(function (data) {
        var uvi = data.current.uvi;
        // console.log(data)
        $('#currentday').show()
        $('#uvindex').text("UV Index: " + uvi)
        if (uvi <= 3.99) {
            // console.log("low")
            $('#uvindex').css("background-color", "green");
            $('#uvindex').css("color", "white");
        } else if (uvi >= 6.99) {
            // console.log("high")
            $('#uvindex').css("background-color", "red");
            $('#uvindex').css("color", "white");
        } else {
            // console.log("medium")
            $('#uvindex').css("background-color", "yellow");
            $('#uvindex').css("color", "black");
        }

        $('#fivedayforecast').show();
        $('#forecastheader').show();
        // debugger
        for (var i = 1; i < 6 ; i++) {
            
        var cardDate = (moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
        var cardImgEl = $('<img />',
            {id: "img",
             src: "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png",
             width: 50
            });
        var cardTemp = ("Temp: " + data.daily[i].temp.max + "°F");
        var cardWind = ("Wind: " + data.daily[i].wind_speed + " MPH");
        var cardHumidity = ("Humidity: " + data.daily[i].humidity + "%");
        var card = $('<card />');

        card.attr("class", "card");

        $('#fivedayforecast').append(card);
        
        $(card).append('<div id="cardDate">' + cardDate + '</div>');
        $(card).append(cardImgEl);
        $(card).append('<div id="cardTemp">' + cardTemp + '</div>');
        $(card).append('<div id="cardWind">' + cardWind + '</div>');
        $(card).append('<div id="cardHumidity">' + cardHumidity + '</div>');

        }
        storeCity();
    }
    
)};



function storeCity() {
    var savedCity = JSON.parse(window.localStorage.getItem("SearchedCity")) || [];
    var city = $("#city")

    var cityElInput = {
        cityName: city.val()
        };
        
    savedCity.push(cityElInput)

    window.localStorage.setItem("SearchedCity", JSON.stringify(savedCity));
    city.val('')
    console.log("displayCity");
    console.log(savedCity)
    
    displayCity(savedCity);
}


    var savedCity = JSON.parse(window.localStorage.getItem("SearchedCity")) || [];
    if (localStorage !== null) {
        // console.log("displayCity");
        displayCity(savedCity);
    }

function displayCity(savedCity) {
    var listCity = $('#listcity');
    listCity.empty()
    for (let i = 0; i < savedCity.length; i++) {
        listCity.append('<button id="citylist">' + savedCity[i].cityName + '</button>')
        // console.log(savedCity[i].cityName)
        
    }   
}