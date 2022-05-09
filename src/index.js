import { tasks } from "./tasks.js";
import { taskslistLocalStorage } from "./taskslistLS";
import { toggleBtwnTabs } from "./tooglebtwntabs";
import { projectTasks, projectTasksFn } from "./projects.js";
import { projectsTaskslistLocalStorage } from "./projectstaskslistLS.js";

document.addEventListener("DOMContentLoaded", () => {
  let listContainer = document.querySelector(".list-container");
  tasks.render(listContainer);
  tasks.taskSubscribe();
  taskslistLocalStorage(); //renders tasks from local storage to persist data on pageload
  toggleBtwnTabs();

  let inboxBtn = document.querySelector(".inbox-btn");
  inboxBtn.classList.add("tabSelectedColor");

  projectsTaskslistLocalStorage();
  projectTasksFn();
});
