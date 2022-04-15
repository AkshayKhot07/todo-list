import { pubsub } from "./pubsub.js";

export const taskSubmit = {
  add: () => {
    let textArea = document.querySelector(".textArea");
    let task = textArea.value;
    textArea.value = "";

    console.log(`TASK SUBMIT: ${task}`);
    pubsub.publish("taskAdded", task);
  },
};
