var APIKey = "9c2f191921ea4a448012e7d41b8872c0";
var city = "Boston";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;




fetch(queryURL)

console.log (queryURL)