// Должна возвращать список пользователя
// Если пользователь ничего не вводил - пустой список
export async function readList() {
  return JSON.parse(localStorage.getItem("cities")) || [];
}
// Сохраняет список
export function saveList(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

export function drawList(el, cities) {
  el.innerHTML = `<ol>${cities.map((el) => `<li>${el}</li>`).join("")}</ol>`;
}

// export function updateList () {
//   if (document.querySelectorAll("li").length > 10) {
//     document.querySelectorAll("li")[0].remove();
//   }
// }
