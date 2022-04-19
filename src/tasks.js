import { pubsub } from "./pubsub.js";
import { addTaskModal } from "./addTaskModal.js";

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
      tasks.taskElement(task, li);
      /*
      let div = document.createElement("div");
      div.className = "taskDetails";
      let p = document.createElement("p");
      let newCheckBox = document.createElement("input");
      newCheckBox.type = "checkbox";
      newCheckBox.id = "newCheckBox";
      div.appendChild(newCheckBox);
      //   li.innerText = task;
      li.dataset.taskName = task;
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
      */
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
    let taskTextEl = li.querySelector("p");
    let taskText = li.querySelector("p").textContent;
    const regex = /^.{3,}$/;

    li.innerHTML = "";
    li.innerHTML += addTaskModal().atbContainer;

    let textArea = document.querySelector(".textArea");
    textArea.innerText = taskText;
    console.log(textArea);

    let addTaskBtn = document.querySelector(".addTaskBtn");
    addTaskBtn.addEventListener("click", () => {
      li.innerHTML = "";

      // tasks.taskElement(textArea, li).li;
      if (textArea.value.match(regex)) {
        tasks.taskElement(textArea, li);
      } else {
        alert("Enter atleast 3 characters");
        tasks.taskElement(taskTextEl, li);
      }

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

    let cancelTaskBtn = document.querySelector(".cancelTaskBtn");
    cancelTaskBtn.addEventListener("click", () => {
      li.innerHTML = "";

      tasks.taskElement(taskTextEl, li);
    });
  },

  taskElement: (el, li) => {
    let taskContent = document.createElement("div");
    taskContent.className = "taskDetails";
    let p = document.createElement("p");
    let newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = "newCheckBox";
    taskContent.appendChild(newCheckBox);
    // console.log(el);
    // console.log(el.tagName);

    if (el.tagName == "TEXTAREA") {
      p.innerText = `${el.value}`;
      li.dataset.taskName = `${el.value}`;
    } else if (el.tagName == "P") {
      p.innerText = `${el.innerText}`;
      li.dataset.taskName = `${el.innerText}`;
    } else {
      p.innerText = `${el}`;
      li.dataset.taskName = `${el}`;
    }

    taskContent.appendChild(p);
    li.appendChild(taskContent);

    let taskTools = document.createElement("div");
    taskTools.className = "taskTools";
    let taskEditBtn = document.createElement("button");
    taskEditBtn.textContent = "Edit";
    taskEditBtn.className = "taskEditBtn";
    taskEditBtn.addEventListener("click", tasks.taskEdited);
    taskTools.appendChild(taskEditBtn);
    li.appendChild(taskTools);

    // return { li };
  },
};
