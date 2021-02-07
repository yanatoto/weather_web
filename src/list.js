import { updateWeather, getWeather } from "./weather";
import { drawMap } from "./map";

// Должна возвращать список пользователя
// Если пользователь ничего не вводил - пустой список
export async function readList() {
  return JSON.parse(localStorage.getItem("cities")) || [];
}
// Сохраняет список
export function saveList(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

async function onListItemClick(city) {
  const weather = await getWeather(city);
  const weatherInfoEl = document.querySelector("#weatherInfo");
  updateWeather(weatherInfoEl, weather);

  const map = document.querySelector(".map");
  drawMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = map)
  );
}

export function drawList(el, cities) {
  el.innerHTML = `<ol>${cities.map((el) => `<li>${el}</li>`).join("")}</ol>`;

  el.addEventListener("click", async (e) => {
    console.log("click");
    if (e.target.tagName === "SPAN") {
      await onListItemClick(e.target.innerText);
    }
  });
}

export function updateList(el, list) {
  const ol = el.querySelector("ol");
  ol.innerHTML = "";

  list.forEach((element) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = element;
    li.appendChild(span);
    ol.appendChild(li);
  });
}
