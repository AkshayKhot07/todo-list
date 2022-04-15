import { tasks } from "./tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  let listContainer = document.querySelector(".list-container");
  tasks.render(listContainer);
  tasks.taskSubscribe();
});
