/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

// import { getWeather, updateWeather } from "./weather";
// import { renderMap } from "./map";

/* eslint-disable func-names */
/* eslint-disable no-shadow */

(async function () {
  // Должна возвращать список пользователя
  // Если пользователь ничего не вводил - пустой список
  async function readList() {
    return JSON.parse(localStorage.getItem("cities")) || [];
  }
  // Сохраняет список
  function saveList(cities) {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  function drawList(el, cities) {
    el.innerHTML = `<ol>${cities.map((el) => `<li>${el}</li>`).join("")}</ol>`;
  }

  // Получаем указатели на нужные элементы
  const form = document.querySelector("form");
  const listEl = document.querySelector("#list");

  // Читаем список при старте
  const cities = await readList();

  // и отрисовываем список
  drawList(listEl, cities);

  form.addEventListener("submit", (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const input = formElement.querySelector("input");
    const value = input.value;
    input.value = "";

    // добавляем элемент в список
    cities.push(value);

    // обновляем список
    drawList(listEl, cities);

    // сохраняем список
    saveList(cities);
  });
})();
