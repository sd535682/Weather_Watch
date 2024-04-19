let weather = {
    apiKey: "263c997de01a38c427a765728fdaac5f",
    pexelsApiKey: "lNxXR802awjhTP1yD0TYcb73LgntM1oQuf0jkbKq3VccI0eX5n1Av5V7",
    fetchWeather: function (city) {
        this.fetchPexelsImage(city);

        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&appid=" + this.apiKey).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { dt, timezone } = data;
        const dandt = new Date(dt * 1000 + timezone * 1000);
        const dtString = dandt.toDateString();
        console.log(name, icon, description, temp, humidity, speed, dtString);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".windspeed").innerText = "Wind speed : " + speed + " kmph";
        document.querySelector(".date").innerText = dtString;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    fetchPexelsImage: function (city) {
        const url = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;
        const headers = { Authorization: this.pexelsApiKey };

        fetch(url, { headers })
            .then((response) => response.json())
            .then((data) => {
                const imageUrl = data.photos[0].src.original;
                document.querySelector(".bg-container").style.backgroundImage = `url(${imageUrl})`;
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });
    },
};

document.querySelector(".search").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Kolkata");

// url = https://api.openweathermap.org/data/2.5/find?q=Kolkata&units=metric&appid=263c997de01a38c427a765728fdaac5f
