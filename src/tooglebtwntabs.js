import { taskslistLocalStorage } from "./taskslistLS";
import { addTaskModal } from "./addTaskModal.js";
import { whichWeek, currentWeek } from "./week.js";
import { tasks } from "./tasks.js";

export const toggleBtwnTabs = () => {
  let listContainer = document.querySelector(".list-container");
  let inboxBtn = document.querySelector(".inbox-btn");
  let todayBtn = document.querySelector(".today-btn");
  let thisweekBtn = document.querySelector(".thisweek-btn");
  let listHeader = document.querySelector(".list-header");

  // Today's tasks
  todayBtn.addEventListener("click", () => {
    inboxBtn.classList.remove("tabSelectedColor");
    thisweekBtn.classList.remove("tabSelectedColor");
    todayBtn.classList.add("tabSelectedColor");
    listHeader.innerText = "Today";

    listContainer.innerHTML = "";

    /* Old Code
    let allTask = Array.from(listContainer.querySelectorAll("li"));
    console.log(allTask);

    for (let i = 0; i < allTask.length - 1; i++) {
      let task = allTask[i];
      let taskDate = allTask[i].querySelector(".taskDate").innerText;

      console.log(task);
      console.log(taskDate);

      let today = new Date();
      let todayDate =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);
      console.log(todayDate);

      if (taskDate === todayDate) {
        // console.log(task);
        let todayTask = task;
        console.log(todayTask);
        listContainer.appendChild(todayTask);
        // listContainer.innerHTML += todayTaks;
      }
    }
    Old Code */

    //New Code
    let today = new Date();
    let todayDate =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    console.log(todayDate);

    let tasksList = JSON.parse(localStorage.getItem("tasksList"));
    console.log(tasksList);
    /*
    let filteredList = tasksList.filter((t) => {
      return t.date == todayDate;
    });
    console.log(filteredList);
    for (let i = 0; i < filteredList.length; i++) {
      let li = document.createElement("li");
      tasks.taskElement(filteredList[i], li);
      listContainer.appendChild(li);
    }
    */
    //Revamp
    let lsObjArr = tasksList.projects;
    lsObjArr.forEach((obj) => {
      // console.log(obj);
      if (obj.name == "Inbox") {
        // console.log(...obj.tasks);
        let multasks = [...obj.tasks];
        // console.log(multasks);

        let filteredObj = multasks.filter((t) => {
          return t.date == todayDate;
        });
        // console.log(filteredObj);
        for (let i = 0; i < filteredObj.length; i++) {
          let li = document.createElement("li");
          tasks.taskElement(filteredObj[i], li);
          listContainer.appendChild(li);
        }
      }
    });
  });

  //Week's tasks
  thisweekBtn.addEventListener("click", () => {
    inboxBtn.classList.remove("tabSelectedColor");
    todayBtn.classList.remove("tabSelectedColor");
    thisweekBtn.classList.add("tabSelectedColor");
    listHeader.innerText = "This Week";

    listContainer.innerHTML = "";

    let currWeek = currentWeek();
    console.log(currWeek);
    // let taskWeek = whichWeek(taskDate);
    console.log(whichWeek("2022-05-07"));

    let tasksList = JSON.parse(localStorage.getItem("tasksList"));
    console.log(tasksList);

    /*
    let filteredList = tasksList.filter((t) => {
      return whichWeek(t.date) == currWeek;
    });
    console.log(filteredList);
    for (let i = 0; i < filteredList.length; i++) {
      let li = document.createElement("li");
      tasks.taskElement(filteredList[i], li);
      listContainer.appendChild(li);
    }
    */
    //Revamp
    let lsObjArr = tasksList.projects;
    lsObjArr.forEach((obj) => {
      // console.log(obj);
      if (obj.name == "Inbox") {
        // console.log(...obj.tasks);
        let multasks = [...obj.tasks];
        // console.log(multasks);

        let filteredObj = multasks.filter((t) => {
          return whichWeek(t.date) == currWeek;
        });
        // console.log(filteredObj);
        for (let i = 0; i < filteredObj.length; i++) {
          let li = document.createElement("li");
          tasks.taskElement(filteredObj[i], li);
          listContainer.appendChild(li);
        }
      }
    });
  });

  //Inbox tasks
  inboxBtn.addEventListener("click", () => {
    inboxBtn.classList.add("tabSelectedColor");
    thisweekBtn.classList.remove("tabSelectedColor");
    todayBtn.classList.remove("tabSelectedColor");
    listHeader.innerText = "Inbox";
    console.log(listContainer);

    listContainer.innerHTML = "";
    let tasksList = JSON.parse(localStorage.getItem("tasksList"));
    console.log(tasksList);
    if (tasksList === null || tasksList.length === 0) {
      listContainer.appendChild(addTaskModal().li);
    }
    taskslistLocalStorage();
  });
};