import { taskslistLocalStorage } from "./taskslistLS";

export const toggleBtwnTabs = () => {
  let listContainer = document.querySelector(".list-container");
  let inboxBtn = document.querySelector(".inbox-btn");
  let todayBtn = document.querySelector(".today-btn");
  let listHeader = document.querySelector(".list-header");

  todayBtn.addEventListener("click", () => {
    inboxBtn.classList.remove("tabSelectedColor");
    todayBtn.classList.add("tabSelectedColor");
    listHeader.innerText = "Today";

    let allTask = Array.from(listContainer.querySelectorAll("li"));
    listContainer.innerHTML = "";

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
  });

  inboxBtn.addEventListener("click", () => {
    inboxBtn.classList.add("tabSelectedColor");
    todayBtn.classList.remove("tabSelectedColor");
    listHeader.innerText = "Inbox";
    console.log(listContainer);

    listContainer.innerHTML = "";
    taskslistLocalStorage();
  });
};
