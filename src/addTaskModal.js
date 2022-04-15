import { taskSubmit } from "./task-submit.js";

export const addTaskModal = () => {
  let li = document.createElement("li");
  let iniTaskBtn = document.createElement("button");
  iniTaskBtn.textContent = "+ Add task";
  iniTaskBtn.classList.add("iniTaskBtn");

  li.appendChild(iniTaskBtn);

  const atbContainer = `<div class="atbContainer">
  <textarea
    name="task"
    id="task"
    cols="80"
    rows="5"
    class="textArea"
  ></textarea>
  <button class="addTaskBtn">Add Task</button>
  <button class="canceTaskBtn">Cancel</button>
</div>`;

  iniTaskBtn.addEventListener("click", function () {
    li.innerHTML = "";
    li.innerHTML += atbContainer;
    let addTaskBtn = document.querySelector(".addTaskBtn");
    addTaskBtn.addEventListener("click", taskSubmit.add);
  });

  return { li };
};
