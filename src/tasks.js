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

  taskAdded: (obj) => {
    console.log(`TASKS: ${Object.values(obj)[0]} was added`);
    // let list = new Set(tasks.list);
    let list = tasks.list;
    list.push(obj);

    let filteredList = list.filter(
      (tag, index, array) =>
        array.findIndex((t) => t.task == tag.task && t.date == tag.date) ==
        index
    );

    tasks.list = filteredList;

    console.log(filteredList);

    // localStorage.setItem("tasksList", JSON.stringify(tasks.list));
    localStorage.setItem("tasksList", JSON.stringify(filteredList));

    // console.log(`TASKS: tasksUpdated the list`);
    // pubsub.publish("tasksUpdated", tasks.list);

    let ul = document.querySelector(".list-container");
    ul.innerHTML = "";
    let df = document.createDocumentFragment();
    let df2 = document.createDocumentFragment();

    tasks.list.forEach((obj) => {
      let li = document.createElement("li");
      tasks.taskElement(obj, li);
      df.appendChild(li);
    });

    tasks.render(df2);
    ul.appendChild(df);
    ul.appendChild(df2);
  },

  taskDeleted: (ev) => {
    let item = ev.target.closest("input[type=checkbox]");
    if (!item) return;
    // let task = item.parentElement.innerText;
    let taskText = item.nextElementSibling.innerText;
    let taskDate = ev.target.closest("li").querySelector(".taskDate").innerText;
    console.log(taskText);
    console.log(taskDate);
    // console.log(`TEST: ${task}`);

    // tasks.list = tasks.list.filter((tsk) => {
    //   console.log(
    //     `${Object.values(tsk)[0].trim()} and ${Object.values(tsk)[1].trim()}`
    //   );
    //   return (
    //     Object.values(tsk)[0].trim() !== taskText.trim() &&
    //     Object.values(tsk)[1].trim() !== taskDate.trim()
    //   );
    // });

    tasks.list = tasks.list.filter(
      // (t) => !(t.task == taskText && t.date == taskDate)
      (t) => !(t.task.includes(taskText) && t.date.includes(taskDate))
    );

    item.parentElement.parentElement.parentElement.removeChild(
      item.parentElement.parentElement
    );

    console.log(tasks.list);

    localStorage.setItem("tasksList", JSON.stringify(tasks.list));
    console.log(`TASKS: taskDeleted ${taskText}`);
    pubsub.publish("taskDeleted", tasks.list);
  },

  taskEdited: (ev) => {
    let li = ev.target.closest("li");
    let taskTextEl = li.querySelector("p");
    let taskText = li.querySelector("p").textContent;
    const regex = /^.{3,}$/;

    let taskDate = li.querySelector(".taskDate");
    let date = taskDate.textContent;

    li.innerHTML = "";
    li.innerHTML += addTaskModal().atbContainer;

    let textArea = document.querySelector(".textArea");
    textArea.innerText = taskText;
    console.log(textArea);

    let objtaskTextEl = { taskTextEl, date };

    let datePicker = document.querySelector(".datePicker");
    datePicker.value = date;
    datePicker.min = new Date().toISOString().split("T")[0];

    let addTaskBtn = document.querySelector(".addTaskBtn");
    addTaskBtn.addEventListener("click", () => {
      //Get current date value
      let datePickerValue = datePicker.value;
      li.innerHTML = "";

      // tasks.taskElement(textArea, li).li;
      if (textArea.value.match(regex)) {
        // tasks.taskElement(textArea, li)
        let objtextArea = { textArea, date: datePickerValue };
        console.log(objtextArea);
        tasks.taskElement(objtextArea, li);
      } else {
        alert("Enter atleast 3 characters");
        // tasks.taskElement(taskTextEl, li);
        tasks.taskElement(objtaskTextEl, li);
      }

      //// Edit Task date on todays tab
      let listContainer = document.querySelector(".list-container");
      let todayBtn = document.querySelector(".today-btn");
      if (todayBtn.classList.contains("tabSelectedColor")) {
        let allTask = Array.from(listContainer.querySelectorAll("li"));
        console.log(allTask);
        listContainer.innerHTML = "";

        for (let i = 0; i < allTask.length; i++) {
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

          if (taskDate == todayDate) {
            listContainer.appendChild(task);
          }
        }
      }
      //// Edit Task date on todays tab

      /* Previous Code
      let listContainer = document.querySelector(".list-container");
      let allTasks = Array.from(listContainer.querySelectorAll("p"));
      let allTasksDates = Array.from(
        listContainer.querySelectorAll(".taskDate")
      );

      tasks.list = [];

      allTasks.forEach((task, i) =>
        tasks.list.push({
          task: task.innerText,
          date: allTasksDates[i].textContent,
        })
      );
      */

      console.log(tasks.list);

      tasks.list.forEach((obj) => {
        if (obj.task === taskText && obj.date === taskDate.textContent) {
          obj.task = textArea.value;
          obj.date = datePickerValue;
        }
      });

      console.log(tasks.list);
      localStorage.setItem("tasksList", JSON.stringify(tasks.list));
    });

    let cancelTaskBtn = document.querySelector(".cancelTaskBtn");
    cancelTaskBtn.addEventListener("click", () => {
      li.innerHTML = "";

      tasks.taskElement(objtaskTextEl, li);
    });
  },

  taskElement: (obj, li) => {
    let taskContent = document.createElement("div");
    taskContent.className = "taskDetails";
    let p = document.createElement("p");
    let newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = "newCheckBox";
    taskContent.appendChild(newCheckBox);

    if (Object.keys(obj)[0] == "textArea") {
      p.innerText = `${Object.values(obj)[0].value}`;
      li.dataset.taskName = `${Object.values(obj)[0].value}`;
    } else if (Object.keys(obj)[0] == "taskTextEl") {
      p.innerText = `${Object.values(obj)[0].innerText}`;
      li.dataset.taskName = `${Object.values(obj)[0].innerText}`;
    } else {
      p.innerText = `${Object.values(obj)[0]}`;
      li.dataset.taskName = `${Object.values(obj)[0]}`;
    }

    taskContent.appendChild(p);
    li.appendChild(taskContent);

    let taskTools = document.createElement("div");
    taskTools.className = "taskTools";

    let taskDate = document.createElement("div");
    taskDate.className = "taskDate";
    if (Object.values(obj)[1] == "") {
      taskDate.innerText = "No Date";
    } else {
      taskDate.innerText = Object.values(obj)[1];
    }
    taskTools.appendChild(taskDate);

    let taskEditBtn = document.createElement("button");
    taskEditBtn.textContent = "Edit";
    taskEditBtn.className = "taskEditBtn";
    taskEditBtn.addEventListener("click", tasks.taskEdited);
    taskTools.appendChild(taskEditBtn);

    li.appendChild(taskTools);

    // return { li };
  },
};
