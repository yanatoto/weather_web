export async function getWeather(cityName) {
  const weather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=8eda416857ac90170ef15cebf17e8fd1`
  ).then((response) => response.json());
  return weather;
}

export async function showWeather(el) {
  const p = document.createElement("p");
  el.appendChild(p);
  const img = document.createElement("img");
  el.appendChild(img);
}

export function updateWeather(el, data) {
  const p = el.querySelector("p");
  p.innerText = `${data.name} ${Number(data.main.temp)}°C`;

  const img = el.querySelector("img");
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
