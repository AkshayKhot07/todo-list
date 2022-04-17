import { tasks } from "./tasks.js";

export const taskslistLocalStorage = () => {
  let tasksList = JSON.parse(localStorage.getItem("tasksList"));

  if (!tasksList) return;
  tasksList.forEach((task) => {
    tasks.taskAdded(task);
  });
};
