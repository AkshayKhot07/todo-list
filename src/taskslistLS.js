import { tasks } from "./tasks.js";

export const taskslistLocalStorage = () => {
  let tasksList = JSON.parse(localStorage.getItem("tasksList"));

  if (!tasksList) return;
  // tasksList.forEach((task) => {
  //   tasks.taskAdded(task);
  // });

  //Revamp
  let lsObjArr = tasksList.projects;
  lsObjArr.forEach((obj) => {
    // console.log(obj);
    if (obj.name == "Inbox") {
      console.log(...obj.tasks);
      let multasks = [...obj.tasks];
      // console.log(multasks);
      multasks.forEach((taskobj) => {
        tasks.taskAdded(taskobj);
      });
    }
  });
};
