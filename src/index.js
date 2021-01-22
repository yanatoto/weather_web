// import WebpackLogo from "./assets/webpack-logo.png";
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

  async function getWeather(cityName) {
    const weather = fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=${cityName}&appid=8eda416857ac90170ef15cebf17e8fd1`
    );
    return (await weather).json();
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
})();
