let form = document.querySelector("body form");

form.addEventListener("submit", async (e) => {
  var city = document.querySelector("#city");
  e.preventDefault();
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=4216104a9c50bfc97ddb77e6a7d3af2b`
  )
    .then((res) => res.json())
    .then(dispData)
    .catch((err) => {
      console.log(err)
      document.querySelector("#error").style.display = "block";
    });
});

var dispData = (weather) => {
  document.querySelector("#city-name").textContent = `${city.value}`;
  document.querySelector("#temp").textContent = `${weather.main.temp}C`;
  document.querySelector("#humid").textContent = `${weather.main.humidity}%`;
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png"></img>`;
  console.log(weather);
};
