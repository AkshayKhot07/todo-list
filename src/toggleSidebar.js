export const toggleSidebar = () => {
  const menuIcon = document.querySelector(".menu-icon");
  const aside = document.querySelector("aside");
  const main = document.querySelector("main");
  const container = document.querySelector(".container");
  const sometest = document.querySelector(".default-task-list");

  menuIcon.addEventListener("click", () => {
    aside.classList.toggle("hideSidebar");
  });
};
