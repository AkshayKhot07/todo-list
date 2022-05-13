import { taskslistLocalStorage } from "./taskslistLS";
import { tasks } from "./tasks.js";

export const projectTasksFn = () => {
  let projectsTaskList = document.querySelector(".projects-task-list");
  let projTaskArr = [];
  //   let addProjectBtnHtml = `
  //   <button class="add-project-btn">
  //     <i class="fa-solid fa-plus"></i> Add Project
  //   </button>`;

  let addProjectBtn = document.createElement("button");
  addProjectBtn.classList.add("add-project-btn");
  addProjectBtn.append("➕ Add Project");

  let tasksList = JSON.parse(localStorage.getItem("tasksList"));
  if (tasksList == null) {
    projectsTaskList.appendChild(addProjectBtn);
  } else {
    tasksList.projects.forEach((obj) => {
      if (obj.name !== "Inbox") {
        projTaskArr.push(obj.name);
      }
    });
    projectsTaskList.appendChild(addProjectBtn);
  }

  let projectsTaskModal = `
  <div class="projects-task-modal">
   <input type="text" class="projects-task-input"/>
   <buttton class="projects-task-addBtn">Add</buttton>
   <buttton class="projects-task-cancelBtn">Cancel</buttton>
  </div>
  `;

  addProjectBtn.addEventListener("click", () => {
    console.log("Add project Button clicked!");

    if (projTaskArr.length > 0) {
      projectsTaskList.innerHTML = "";
      for (let i = 0; i < projTaskArr.length; i++) {
        projectsTaskList.innerHTML += renderProjectsTasks(projTaskArr[i]);
        //Delete Projects Task
        let projectsTaskCancelBtns = Array.from(
          document.querySelectorAll(".projects-task-cancel")
        );
        projectsTaskCancelBtns.forEach((projtask) => {
          let projectsTaskCancelBtn = projtask;
          projectsTaskCancelBtn.addEventListener("click", deleteProjectsTask);
        });
      }
      projectsTaskList.innerHTML += projectsTaskModal;
    } else {
      projectsTaskList.innerHTML = "";
      projectsTaskList.innerHTML = projectsTaskModal;
    }

    let projectsTaskCancel = document.querySelector(".projects-task-cancelBtn");
    projectsTaskCancel.addEventListener("click", () => {
      // projectsTaskList.innerHTML = "";
      if (projTaskArr.length > 0) {
        projectsTaskList.innerHTML = "";
        for (let i = 0; i < projTaskArr.length; i++) {
          projectsTaskList.innerHTML += renderProjectsTasks(projTaskArr[i]);
          //Delete Projects Task
          let projectsTaskCancelBtns = Array.from(
            document.querySelectorAll(".projects-task-cancel")
          );
          projectsTaskCancelBtns.forEach((projtask) => {
            let projectsTaskCancelBtn = projtask;
            projectsTaskCancelBtn.addEventListener("click", deleteProjectsTask);
          });
        }
        projectsTaskList.appendChild(addProjectBtn);
      } else {
        projectsTaskList.innerHTML = "";
        projectsTaskList.appendChild(addProjectBtn);
      }
      //Select Project Task
      projectHighlight();
      selectProjectTask();
    });

    let projectsTaskAdd = document.querySelector(".projects-task-addBtn");
    let projectsTaskInput = document.querySelector(".projects-task-input");

    projectsTaskAdd.addEventListener("click", () => {
      let projectsTaskInputValue = projectsTaskInput.value.trim();
      const regex = /[a-zA-Z0-9]/;

      if (!projectsTaskInputValue.match(regex)) {
        projectsTaskInput.placeholder = "Enter atleast 1 char or number";
        return;
      }
      projTaskArr.push(projectsTaskInputValue);
      console.log(projTaskArr);

      //Local Storage
      let obj = {
        name: projectsTaskInputValue,
        tasks: [],
      };

      let tasksList = JSON.parse(localStorage.getItem("tasksList"));
      if (tasksList == null) {
        localStorage.setItem(
          "tasksList",
          JSON.stringify({
            projects: [obj],
          })
        );
      } else {
        tasksList.projects.push(obj);
        console.log(projTaskArr);
        console.log(tasksList.projects);
        localStorage.setItem("tasksList", JSON.stringify(tasksList));
      }

      if (projTaskArr.length > 0) {
        projectsTaskList.innerHTML = "";
        for (let i = 0; i < projTaskArr.length; i++) {
          projectsTaskList.innerHTML += renderProjectsTasks(projTaskArr[i]);
          //Delete Projects Task
          let projectsTaskCancelBtns = Array.from(
            document.querySelectorAll(".projects-task-cancel")
          );
          projectsTaskCancelBtns.forEach((projtask) => {
            let projectsTaskCancelBtn = projtask;
            projectsTaskCancelBtn.addEventListener("click", deleteProjectsTask);
          });
        }
        projectsTaskList.appendChild(addProjectBtn);
      } else {
        projectsTaskList.appendChild(addProjectBtn);
      }
      //Select Project Task
      projectHighlight();
      selectProjectTask();
    });
    //Select Project Task
    projectHighlight();
    selectProjectTask();
  });

  //Delete Projects Task
  let projectsTaskCancelBtns = Array.from(
    document.querySelectorAll(".projects-task-cancel")
  );
  projectsTaskCancelBtns.forEach((projtask) => {
    let projectsTaskCancelBtn = projtask;
    projectsTaskCancelBtn.addEventListener("click", deleteProjectsTask);
  });

  function deleteProjectsTask(e) {
    if (e.target.className == "projects-task-cancel") {
      let inboxBtn = document.querySelector(".inbox-btn");
      let item = e.target.closest("div");
      let itemSibling = item.previousElementSibling.innerText
        .replace("📑", "")
        .trim();
      console.log(itemSibling);
      let itemParent = item.parentNode;
      if (itemParent.classList.contains("tabSelectedColor")) {
        itemParent.classList.remove("tabSelectedColor");
        inboxBtn.classList.add("tabSelectedColor");
        taskslistLocalStorage();
        let listHeader = document.querySelector(".list-header");
        listHeader.innerText = "Inbox";
      }
      itemParent.remove();
      let itemSiblingIndex = projTaskArr.indexOf(itemSibling);
      if (itemSiblingIndex > -1) {
        projTaskArr.splice(itemSiblingIndex, 1);
      }
      console.log(projTaskArr);
      let tasksList = JSON.parse(localStorage.getItem("tasksList"));
      tasksList.projects = tasksList.projects.filter((obj) => {
        return obj.name !== itemSibling;
      });
      console.log(tasksList);
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
      //Select Project Task
      // selectProjectTask();
    }
  }

  //Select projects Task
  // selectProjectTask();
};

export function selectProjectTask() {
  let projectsTaskList = document.querySelector(".projects-task-list");
  let allProjectsTasks = Array.from(
    projectsTaskList.querySelectorAll(".projects-task")
  );
  console.log(allProjectsTasks);
  allProjectsTasks.forEach((projTask) => {
    let projectTask = projTask;
    projectTask.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("projects-task") ||
        e.target.classList.contains("projects-task-text")
      ) {
        let aside = document.querySelector("aside");
        let asideAllButtons = aside.querySelectorAll("button");
        let asideAllDivs = aside.querySelectorAll("div");
        asideAllButtons.forEach((b) => b.classList.remove("tabSelectedColor"));
        asideAllDivs.forEach((d) => d.classList.remove("tabSelectedColor"));
        let currProjectTask = projTask;
        currProjectTask.classList.add("tabSelectedColor");
        console.log(currProjectTask);
        let currProjectTaskText = currProjectTask.firstElementChild.innerText
          .replace("📑", "")
          .trim();
        console.log(currProjectTaskText);
        let listContainer = document.querySelector(".list-container");
        let listHeader = document.querySelector(".list-header");
        listContainer.innerHTML = "";
        listHeader.innerText = currProjectTaskText;

        //Check on LS first
        let tasksList = JSON.parse(localStorage.getItem("tasksList"));
        tasksList.projects.forEach((o) => {
          if (o.name == currProjectTaskText && o.tasks.length > 0) {
            tasks.renderTasksMainContainer(o.tasks);
          } else if (o.name == currProjectTaskText && o.tasks.length == 0) {
            tasks.render(listContainer);
          }
        });
      }
    });
  });
}

export function renderProjectsTasks(task) {
  let renderTaskHtml = `
  <div class="projects-task">
   <div class="projects-task-text">📑 ${task}</div>
   <div class="projects-task-cancel">❌</div>
  </div>
  `;

  return renderTaskHtml;
}

export function checkNameNotInbox(obj) {
  let projArr = obj.projects;
  projArr.forEach((obj) => {
    if (obj.name !== "Inbox") {
      return true;
    }
  });
}

function projectHighlight() {
  let listHeader = document.querySelector(".list-header").innerText;
  let aside = document.querySelector("aside");
  let asideAllDivs = aside.querySelectorAll("div");
  asideAllDivs.forEach((div) => {
    if (div.innerText.replace("📑", "").trim() == listHeader) {
      div.classList.add("tabSelectedColor");
    }
  });
}
