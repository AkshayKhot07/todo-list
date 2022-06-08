import { pubsub } from "./pubsub.js";
import { addTaskModal } from "./addTaskModal.js";
import { whichWeek, currentWeek } from "./week.js";
import { checkNameNotInbox } from "./projects.js";

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
    //initialize LS
    if (!JSON.parse(localStorage.getItem("tasksList"))) {
      localStorage.setItem(
        "tasksList",
        JSON.stringify({
          projects: [
            {
              name: "Inbox",
              tasks: [],
            },
          ],
        })
      );
    }

    console.log(obj);
    console.log(`TASKS: ${Object.values(obj)[0]} was added`);

    //Projects section - pushing tasks under respective project
    let projectsTaskList = document.querySelector(".projects-task-list");
    let allProjectsTasks = Array.from(
      projectsTaskList.querySelectorAll(".projects-task")
    );
    allProjectsTasks.forEach((projTask) => {
      if (projTask.classList.contains("tabSelectedColor")) {
        console.log("Projects task tab selectedcolor");
        let currProjectTaskText = projTask.firstElementChild.innerText
          .replace("📑", "")
          .trim();
        console.log(currProjectTaskText);
        console.log(obj);
        // console.log(projTask);
        let tasksList = JSON.parse(localStorage.getItem("tasksList"));
        tasksList.projects.forEach((o) => {
          if (o.name == currProjectTaskText) {
            o.tasks.push(obj);
          }
          localStorage.setItem("tasksList", JSON.stringify(tasksList));
        });
      }
    });

    //task object respective of projects or default(Inbox) section is pushed into the list(Array)
    let list = tasks.list;
    list.push(obj);
    let filteredList = list.filter(
      (tag, index, array) =>
        array.findIndex((t) => t.task == tag.task && t.date == tag.date) ==
        index
    );
    tasks.list = filteredList;
    console.log(filteredList);

    //Projects section tasks filtered from default(Inbox) tasks
    let tasksList = JSON.parse(localStorage.getItem("tasksList"));
    tasksList.projects.forEach((o) => {
      if (o.name !== "Inbox") {
        let objsArr = o.tasks;
        objsArr.forEach((objitem) => {
          console.log(objitem.task.concat(objitem.date));
          let objitemconcat = objitem.task.concat(objitem.date);
          filteredList = filteredList.filter(
            (eachobj) => eachobj.task.concat(eachobj.date) !== objitemconcat
          );
          console.log(filteredList);
          tasks.list = filteredList;
        });
      }
    });

    //Inbox (Default) tasks set or pushed into LS
    let inboxBtn = document.querySelector(".inbox-btn");
    if (inboxBtn.classList.contains("tabSelectedColor")) {
      let tasksList = JSON.parse(localStorage.getItem("tasksList"));
      if (tasksList == null) {
        localStorage.setItem(
          "tasksList",
          JSON.stringify({
            projects: [
              {
                name: "Inbox",
                tasks: filteredList,
              },
            ],
          })
        );
      } else {
        let projArr = tasksList.projects;
        console.log(filteredList);

        projArr.forEach((obj) => {
          if (obj.name == "Inbox") {
            // obj.tasks.push(filteredList);
            obj.tasks = filteredList;
          } else if (obj.name !== "Inbox") {
            projArr.push({
              name: "Inbox",
              tasks: filteredList,
            });
          }
        });

        tasksList.projects = tasksList.projects.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );

        localStorage.setItem("tasksList", JSON.stringify(tasksList));
      }
    }
    //Inbox (Default) tasks set or pushed into LS

    // console.log(`TASKS: tasksUpdated the list`);
    // pubsub.publish("tasksUpdated", tasks.list);

    // function renderTasksMainContainer(tasksList) {}

    //Inbox (Default) tasks render on Main Container
    tasks.renderTasksMainContainer(tasks.list);

    //Projects section tasks render on Main Container
    allProjectsTasks.forEach((projTask) => {
      if (projTask.classList.contains("tabSelectedColor")) {
        let currProjectTaskText = projTask.firstElementChild.innerText
          .replace("📑", "")
          .trim();
        let tasksList = JSON.parse(localStorage.getItem("tasksList"));
        tasksList.projects.forEach((o) => {
          if (o.name == currProjectTaskText) {
            tasks.renderTasksMainContainer(o.tasks);
          }
        });
      }
    });
  },

  renderTasksMainContainer: (tasksList) => {
    let ul = document.querySelector(".list-container");
    ul.innerHTML = "";
    let df = document.createDocumentFragment();
    let df2 = document.createDocumentFragment();

    //tasks.list
    tasksList.forEach((obj) => {
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
    let taskText = item.nextElementSibling.innerText.split("(")[0].trim();
    let taskDate = ev.target.closest("li").querySelector(".taskDate").innerText;
    console.log(taskText);
    console.log(taskDate);

    tasks.list = tasks.list.filter(
      // (t) => !(t.task == taskText && t.date == taskDate)
      (t) => !(t.task.includes(taskText) && t.date.includes(taskDate))
    );

    item.parentElement.parentElement.parentElement.removeChild(
      item.parentElement.parentElement
    );

    console.log(tasks.list);

    // localStorage.setItem("tasksList", JSON.stringify(tasks.list));
    let tasksList = JSON.parse(localStorage.getItem("tasksList"));
    let projArr = tasksList.projects;
    projArr.forEach((obj) => {
      if (obj.name == "Inbox") {
        obj.tasks = tasks.list;
      } else if (obj.name !== "Inbox") {
        let objsArr = obj.tasks;
        objsArr = objsArr.filter(
          (objitem) =>
            objitem.task.concat(objitem.date) !== taskText.concat(taskDate)
        );
        console.log(objsArr);
        console.log(obj);
        obj.tasks = objsArr;
      }
    });
    localStorage.setItem("tasksList", JSON.stringify(tasksList));

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

      //// Edit Task date on thisweek's tab
      // let listContainer = document.querySelector(".list-container");
      let thisweekBtn = document.querySelector(".thisweek-btn");
      if (thisweekBtn.classList.contains("tabSelectedColor")) {
        let allTask = Array.from(listContainer.querySelectorAll("li"));
        console.log(allTask);
        listContainer.innerHTML = "";

        for (let i = 0; i < allTask.length; i++) {
          let task = allTask[i];
          let taskDate = whichWeek(
            allTask[i].querySelector(".taskDate").innerText
          );

          console.log(task);
          console.log(taskDate);

          let currWeek = currentWeek();

          if (taskDate == currWeek) {
            listContainer.appendChild(task);
          }
        }
      }
      //// Edit Task date on thisweek's tab

      //Edit task for Inbox(Default) tasks
      console.log(tasks.list);
      tasks.list.forEach((obj) => {
        if (obj.task === taskText && obj.date === taskDate.textContent) {
          obj.task = textArea.value;
          obj.date = datePickerValue;
        }
      });
      console.log(tasks.list);

      // localStorage.setItem("tasksList", JSON.stringify(tasks.list));
      let tasksList = JSON.parse(localStorage.getItem("tasksList"));
      let listHeader = document.querySelector(".list-header").textContent;
      let objtextArea = { textArea, date: datePickerValue };
      console.log(listHeader);
      let projArr = tasksList.projects;
      projArr.forEach((obj) => {
        if (obj.name == "Inbox") {
          obj.tasks = tasks.list;
        }
        //Edit respective task for respective project
        else if (obj.name == listHeader) {
          let objTasksArr = obj.tasks;
          objTasksArr.forEach((t) => {
            if (
              t.task == Object.values(objtextArea)[0].innerText &&
              t.date == date
            ) {
              t.task = Object.values(objtextArea)[0].value;
              t.date = Object.values(objtextArea)[1];
            }
          });
          console.log(Object.values(objtextArea)[0].innerText);
          console.log(Object.values(objtextArea)[1]);
        }
      });
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
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
