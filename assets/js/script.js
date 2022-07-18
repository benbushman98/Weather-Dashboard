var APIKey = "9c2f191921ea4a448012e7d41b8872c0";
var city = $("#city");
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var searchBtn = $("#searchbtn").click(cityInput);

function cityInput() {
    var ulEl = $('ul');
    var liEl = $('<li>');

    if(city.val() === "") {
    alert("Enter City to Search Weather");
    } 
    else {
    liEl.addClass('searchcities');
    ulEl.append(liEl);
    liEl.text(city.val());
    window.localStorage.setItem("Searched City", city.val());
    city.val("");
    }
}

