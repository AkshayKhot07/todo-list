import { pubsub } from "./pubsub.js";

export const taskSubmit = {
  add: () => {
    let textArea = document.querySelector(".textArea");
    let task = textArea.value.trim();
    textArea.value = "";
    const regex = /^.{3,}$/;
    if (task.match(regex)) {
      console.log(`TASK SUBMIT: ${task}`);
      pubsub.publish("taskAdded", task);
    } else {
      alert("Enter atleast 3 characters");
    }
  },
};
