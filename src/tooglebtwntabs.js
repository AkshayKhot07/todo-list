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
    listContainer.innerHTML = "";
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
