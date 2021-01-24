import "./styles/styles.css";
import { getWeather, showWeather } from "./weather";

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

  // async function getUrlIcon(cityName) {
  //   const iconName = await getWeather(cityName);
  //   const icon = `<img src="https://openweathermap.org/img/wn/${iconName.icon}@2x.png">`;

  //   return icon;
  // }
  // getUrlIcon();

  function getUserMap(userCity) {
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${userCity}&size=500x500&key=AIzaSyDANLeEnr2Wf05hG0wxHA0Ucqz5CeZF_Cw`;
    return mapUrl;
  }

  const userCity = await getUserLocation();

  async function renderMap(el, result) {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML = await result;
  }

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
  });
})();
