import { renderProjectsTasks } from "./projects.js";

export const projectsTaskslistLocalStorage = () => {
  let projectsTaskList = document.querySelector(".projects-task-list");
  let tasksList = JSON.parse(localStorage.getItem("tasksList"));
  if (tasksList == null) return;
  tasksList.projects.forEach((obj) => {
    if (obj.name !== "Inbox") {
      //   projectsTaskList.appendChild(renderProjectsTasks(obj.name));
      projectsTaskList.innerHTML += renderProjectsTasks(obj.name);
    }
  });
};
