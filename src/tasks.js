import { pubsub } from "./pubsub.js";
import { addTaskModal } from "./addTaskModal.js";

export const tasks = {
  list: [],

  render: (container) => {
    container.appendChild(addTaskModal().li);
    pubsub.subscribe("taskAdded", tasks.taskAdded);
  },

  taskAdded: (task) => {
    console.log(`TASKS: ${task} was added`);
    let list = new Set(tasks.list);
    list.add(task);
    tasks.list = Array.from(list);

    console.log(`TASKS: tasksUpdated the list`);
    pubsub.publish("tasksUpdated", tasks.list);

    let ul = document.querySelector(".list-container");
    ul.innerHTML = "";
    let df = document.createDocumentFragment();
    let df2 = document.createDocumentFragment();

    tasks.list.forEach((task) => {
      let li = document.createElement("li");
      let newCheckBox = document.createElement("input");
      newCheckBox.type = "checkbox";
      newCheckBox.id = "newCheckBox";
      li.appendChild(newCheckBox);
      //   li.innerText = task;
      li.append(task);
      df.appendChild(li);
    });

    tasks.render(df2);
    ul.appendChild(df);
    ul.appendChild(df2);
  },
};
