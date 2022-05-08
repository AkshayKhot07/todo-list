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

  projectsTaskList.appendChild(addProjectBtn);

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
        }
      }
      projectsTaskList.appendChild(addProjectBtn);
    });

    let projectsTaskAdd = document.querySelector(".projects-task-addBtn");
    let projectsTaskInput = document.querySelector(".projects-task-input");

    projectsTaskAdd.addEventListener("click", () => {
      let projectsTaskInputValue = projectsTaskInput.value;
      projTaskArr.push(projectsTaskInputValue);
      console.log(projTaskArr);

      if (projTaskArr.length > 0) {
        projectsTaskList.innerHTML = "";
        for (let i = 0; i < projTaskArr.length; i++) {
          projectsTaskList.innerHTML += renderProjectsTasks(projTaskArr[i]);
        }
      }

      projectsTaskList.appendChild(addProjectBtn);
    });
  });
};

function renderProjectsTasks(task) {
  let renderTaskHtml = `
  <div class="projects-task">
   <div class="projects-task-text">📑 ${task}</div>
   <div class="projects-task-cancel">❌</div>
  </div>
  `;

  return renderTaskHtml;
}
