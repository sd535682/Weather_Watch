let weather = {
    "apiKey" : "263c997de01a38c427a765728fdaac5f",
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city + "&units=metric&appid=" + this.apiKey).
        then((response)=> response.json()).then((data)=> this.displayWeather(data));
    },
    displayWeather : function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {dt, timezone} = data;
        const dandt = new Date(dt * 1000 + timezone * 1000);
        const dtString = dandt.toDateString();
        console.log(name,icon, description,temp,humidity,speed, dtString);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp+" °C";
        document.querySelector(".humidity").innerText = "Humidity : "+humidity+"%";
        document.querySelector(".windspeed").innerText = "Wind speed : "+speed+" kmph";
        document.querySelector(".date").innerText = dtString;
        document.body.style.backgroundImage= "url('https://unsplash.com/collections/1408037/weather')";
    },
    search : function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search").addEventListener("click", function(){
weather.search();
});

document.querySelector(".search").addEventListener("keyup", function(event){
if(event.key=="Enter"){
    weather.search();
}
});

weather.fetchWeather("Kolkata");

// url = https://api.openweathermap.org/data/2.5/find?q=Kolkata&units=metric&appid=263c997de01a38c427a765728fdaac5f
