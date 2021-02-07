import "./styles/styles.css";
import {
  getWeather,
  drawWeather,
  updateWeather,
  getUserLocation,
} from "./weather";
import { getUserMap, drawMap } from "./map";
import { readList, saveList, drawList } from "./list";

(async function () {
  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weatherInfo");
  const listEl = document.querySelector("#list");

  const userCity = await getUserLocation();
  const userWeather = await getWeather(userCity);
  // Читаем список при старте
  const cities = await readList();

  const map = getUserMap(userCity);

  drawWeather(weatherInfoEl, userWeather);

  drawMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = map)
  );

  formEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const formElement = ev.target;
    const input = formElement.querySelector("input");
    const city = input.value;
    input.value = "";

    const weather = await getWeather(city);
    const userMap = getUserMap(city);

    drawMap(
      document.querySelector(".img"),
      (document.querySelector(".img").src = userMap)
    );

    updateWeather(weatherInfoEl, weather);

    while (cities.length > 9) {
      cities.shift();
    }
    // и отрисовываем список
    drawList(listEl, cities);

    // добавляем элемент в список
    cities.push(city);

    // обновляем список
    drawList(listEl, cities);

    // сохраняем список
    saveList(cities);

    // const listItems = document.querySelectorAll("li");

    // console.log(listItems);
  });

  updateWeather(weatherInfoEl, userWeather);
})();
