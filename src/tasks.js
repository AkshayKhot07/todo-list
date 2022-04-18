import { pubsub } from "./pubsub.js";
import { addTaskModal } from "./addTaskModal.js";
import { taskSubmit } from "./task-submit.js";

export const tasks = {
  list: [],

  render: (container) => {
    container.appendChild(addTaskModal().li);

    let ul = document.querySelector(".list-container");
    ul.addEventListener("click", tasks.taskDeleted);
    // ul.addEventListener("click", tasks.taskEdited);
  },

  taskSubscribe: () => {
    pubsub.subscribe("taskAdded", tasks.taskAdded);
  },

  taskAdded: (task) => {
    console.log(`TASKS: ${task} was added`);
    let list = new Set(tasks.list);
    list.add(task);
    tasks.list = Array.from(list);
    console.log(list);

    localStorage.setItem("tasksList", JSON.stringify(tasks.list));

    // console.log(`TASKS: tasksUpdated the list`);
    // pubsub.publish("tasksUpdated", tasks.list);

    let ul = document.querySelector(".list-container");
    ul.innerHTML = "";
    let df = document.createDocumentFragment();
    let df2 = document.createDocumentFragment();

    tasks.list.forEach((task) => {
      let li = document.createElement("li");
      let div = document.createElement("div");
      div.className = "taskDetails";
      let p = document.createElement("p");
      let newCheckBox = document.createElement("input");
      newCheckBox.type = "checkbox";
      newCheckBox.id = "newCheckBox";
      div.appendChild(newCheckBox);
      //   li.innerText = task;
      li.dataset.taskName = task;
      // li.setAttribute("contenteditable", "true");
      // p.setAttribute("contenteditable", "true");
      p.innerText = task;
      // li.append(task);
      div.appendChild(p);
      li.appendChild(div);

      //Taks tools div
      let taskTools = document.createElement("div");
      taskTools.className = "taskTools";
      let taskEditBtn = document.createElement("button");
      taskEditBtn.textContent = "Edit";
      taskEditBtn.className = "taskEditBtn";
      taskEditBtn.addEventListener("click", tasks.taskEdited);
      taskTools.appendChild(taskEditBtn);
      li.appendChild(taskTools);

      df.appendChild(li);
    });

    tasks.render(df2);
    ul.appendChild(df);
    ul.appendChild(df2);
  },

  taskDeleted: (ev) => {
    let item = ev.target.closest("input");
    if (!item) return;
    // let task = item.parentElement.innerText;
    let task = item.nextElementSibling.innerText;
    // console.log(`TEST: ${task}`);

    tasks.list = tasks.list.filter((tsk) => tsk !== task);
    item.parentElement.parentElement.parentElement.removeChild(
      item.parentElement.parentElement
    );
    // console.log(tasks.list);

    localStorage.setItem("tasksList", JSON.stringify(tasks.list));
    console.log(`TASKS: taskDeleted ${task}`);
    pubsub.publish("taskDeleted", tasks.list);
  },

  taskEdited: (ev) => {
    let li = ev.target.closest("li");

    let taskText = li.querySelector("p").textContent;

    li.innerHTML = "";
    li.innerHTML += addTaskModal().atbContainer;

    let textArea = document.querySelector(".textArea");
    textArea.innerText = taskText;
    console.log(textArea);

    let addTaskBtn = document.querySelector(".addTaskBtn");
    addTaskBtn.addEventListener("click", () => {
      li.innerHTML = "";
      li.innerHTML += `
      <div class="taskDetails">
      <input type="checkbox" id="newCheckBox">
      <p>${textArea.value}</p>
      </div>
      <div class="taskTools">
      <button class="taskEditBtn">Edit</button>
      </div>
      `;
      li.dataset.taskName = `${textArea.value}`;
      let listContainer = document.querySelector(".list-container");
      let allTasks = Array.from(listContainer.querySelectorAll("p"));

      tasks.list = [];

      allTasks.forEach((p) => {
        console.log(p.innerText);
        tasks.list.push(p.innerText);
      });

      console.log(tasks.list);
      localStorage.setItem("tasksList", JSON.stringify(tasks.list));
    });
  },
};
