export const toggleSidebar = () => {
  let inputToggler = document.querySelector("#toggle");
  const aside = document.querySelector("aside");
  const main = document.querySelector("main");
  const defaultTaskList = document.querySelector(".default-task-list");
  const projectTaskList = document.querySelector(".projects-task-list");

  // inputToggler.checked = false;
  inputToggler.addEventListener("click", () => {
    if (inputToggler.type == "checkbox" && inputToggler.checked == true) {
      console.log("input checked");
      aside.style.left = "0";
      main.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

      //sidebar closes on click of input, today and this week button
      defaultTaskList.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          inputToggler.checked = false;
          aside.style.left = "-70%";
          main.style.backgroundColor = "#eee";
        });
      });

      //sidebar closes on click of any respective project div on aside
      projectTaskList.querySelectorAll("div").forEach((div) => {
        div.addEventListener("click", () => {
          inputToggler.checked = false;
          aside.style.left = "-70%";
          main.style.backgroundColor = "#eee";
        });
      });
    }

    if (inputToggler.type == "checkbox" && inputToggler.checked == false) {
      console.log("input not checked");
      aside.style.left = "-70%";
      main.style.backgroundColor = "#eee";
    }
  });
};
