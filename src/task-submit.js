import { pubsub } from "./pubsub.js";

export const taskSubmit = {
  add: () => {
    let textArea = document.querySelector(".textArea");
    let task = textArea.value.trim();
    textArea.value = "";
    const regex = /^.{3,}$/;

    let datePicker = document.querySelector(".datePicker");
    let date = datePicker.value;

    let obj = { task, date };
    console.log(obj);

    if (task.match(regex)) {
      console.log(`TASK SUBMIT: ${task} ${date}`);
      pubsub.publish("taskAdded", obj);
    } else {
      alert("Enter atleast 3 characters");
    }
  },
};
