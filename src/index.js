import "./styles/styles.css";

// eslint-disable-next-line func-names
(async function () {
  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weatherInfo");

  function showWeather(el, weatherInfo) {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML = JSON.stringify(weatherInfo, null, 2);
  }

  async function getUserLocation() {
    const url = `https://get.geojs.io/v1/ip/geo.json`;
    const response = await fetch(url);
    const json = await response.json();
    return json.city;
  }

  async function getWeather(cityName) {
    const weather = fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=8eda416857ac90170ef15cebf17e8fd1`
    );
    return (await weather).json();
  }

  async function getUserMap(cityName) {
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${cityName}=14&size=400x400&key=AIzaSyDANLeEnr2Wf05hG0wxHA0Ucqz5CeZF_Cw`;
    const response = await fetch(url);
    const map = await response.text();
    return map;
  }

  formEl.addEventListener("submit", async (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const inputEl = formElement.querySelector("input");
    const cityName = inputEl.value;
    inputEl.value = "";

    const weather = await getWeather(cityName);
    showWeather(weatherInfoEl, weather);
  });
  const userCity = await getUserLocation();
  const userWeather = await getWeather(userCity);
  showWeather(weatherInfoEl, userWeather);
  getUserMap();
})();
