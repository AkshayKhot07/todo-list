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
   <input type="text" class="projects-task-input" />
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
    });

    let projectsTaskAdd = document.querySelector(".projects-task-addBtn");
    let projectsTaskInput = document.querySelector(".projects-task-input");

    projectsTaskAdd.addEventListener("click", () => {
      let projectsTaskInputValue = projectsTaskInput.value;
      if (projectsTaskInputValue == "") return;
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
    });
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
      let item = e.target.closest("div");
      let itemSibling = item.previousElementSibling.innerText
        .replace("📑", "")
        .trim();
      console.log(itemSibling);
      let itemParent = item.parentNode.remove();
      projTaskArr.splice(itemSibling, 1);
      console.log(projTaskArr);
      let tasksList = JSON.parse(localStorage.getItem("tasksList"));
      tasksList.projects = tasksList.projects.filter((obj) => {
        return obj.name !== itemSibling;
      });
      console.log(tasksList);
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
    }
  }

  // deleteProjectsTask();
};

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
