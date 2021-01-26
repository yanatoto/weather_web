import "./styles/styles.css";
import { getWeather, showWeather, updateWeather } from "./weather";
import { getUserMap, renderMap } from "./map";

// eslint-disable-next-line func-names
(async function () {
  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weatherInfo");
  // const listEl = document.querySelector("#list");

  async function getUserLocation() {
    const url = `https://get.geojs.io/v1/ip/geo.json`;
    const response = await fetch(url);
    const json = await response.json();
    return json.city;
  }

  const userCity = await getUserLocation();
  const map = getUserMap(userCity);

  renderMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = map)
  );

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

    const userWeather = await getWeather(userCity);
    showWeather(weatherInfoEl, userWeather);
    updateWeather(weatherInfoEl, weather);

    const userMap = getUserMap(cityName);

    renderMap(
      document.querySelector(".img"),
      (document.querySelector(".img").src = userMap)
    );
  });
})();
