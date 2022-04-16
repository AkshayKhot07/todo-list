import { tasks } from "./tasks.js";

export const taskslistLocalStorage = () => {
  let tasksList = JSON.parse(localStorage.getItem("tasksList"));

  tasksList.forEach((task) => {
    tasks.taskAdded(task);
  });
};
