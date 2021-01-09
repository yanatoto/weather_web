import { greet } from "./greet";

document.body.innerHTML = "<button>Click me</button>";
greet(Number(prompt("Your age???")));
