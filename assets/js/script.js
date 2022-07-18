var APIKey = "9c2f191921ea4a448012e7d41b8872c0";
var city = $("#city").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



function cityInput() {
    alert(city)
    console.log(queryURL);
    console.log("test");
}

var searchBtn = document.getElementById("searchbtn")
searchBtn.addEventListener("click", cityInput)


// fetch(queryURL)

