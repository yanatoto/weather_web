/* eslint-disable no-param-reassign */
import "./styles/styles.css";
import {
  getWeather,
  drawWeather,
  updateWeather,
  getUserLocation,
} from "./weather";
import { getUserMap, renderMap } from "./map";

// eslint-disable-next-line func-names
(async function () {
  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weatherInfo");

  const userCity = await getUserLocation();
  const userWeather = await getWeather(userCity);

  console.log(userWeather);
  // updateWeather(weatherInfoEl, userWeather);

  const map = getUserMap(userCity);

  drawWeather(weatherInfoEl, userWeather);

  renderMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = map)
  );

  formEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const formElement = ev.target;
    const inputEl = formElement.querySelector("input");
    const city = inputEl.value;
    inputEl.value = "";

    const weather = await getWeather(city);

    const userMap = getUserMap(city);

    updateWeather(weatherInfoEl, weather);

    renderMap(
      document.querySelector(".img"),
      (document.querySelector(".img").src = userMap)
    );
  });
  updateWeather(weatherInfoEl, userWeather);
})();
