import { taskSubmit } from "./task-submit.js";
import { tasks } from "./tasks.js";

export const addTaskModal = () => {
  let li = document.createElement("li");
  let iniTaskBtn = document.createElement("button");
  iniTaskBtn.textContent = "+ Add task";
  iniTaskBtn.classList.add("iniTaskBtn");

  li.appendChild(iniTaskBtn);

  const atbContainer = `<div class="atbContainer">
  <div class=taskTextDate>
  <textarea
    name="task"
    id="task"
    cols="80"
    rows="5"
    class="textArea"
  ></textarea>
  <input type="date" id="datePicker" class="datePicker" name="datePicker">
  </div>
  <button class="addTaskBtn">Add Task</button>
  <button class="cancelTaskBtn">Cancel</button>
</div>`;

  iniTaskBtn.addEventListener("click", function () {
    li.innerHTML = "";
    li.innerHTML += atbContainer;
    let addTaskBtn = document.querySelector(".addTaskBtn");
    addTaskBtn.addEventListener("click", taskSubmit.add);
    let cancelTaskBtn = document.querySelector(".cancelTaskBtn");
    cancelTaskBtn.addEventListener("click", function () {
      li.innerHTML = "";
      li.appendChild(iniTaskBtn);
    });
  });

  return { li, atbContainer };
};
