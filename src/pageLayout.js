import { addProject } from "./todoModule";
import { createListItem } from "./todoModule";
import { projects } from "./dataStorage";
import { projectListSetter } from "./todoModule";

// This is for the DOM

const body = document.getElementById("content");

const topBar = document.createElement("div");
topBar.id = "top-bar";

const appTitle = document.createElement("h1");
appTitle.textContent = "Mas To Do";
appTitle.className = "title";

const leftSideBar = document.createElement("div");
leftSideBar.id = "left-side-bar";

const projectsTitle = document.createElement("div");
projectsTitle.id = "projects-title";
projectsTitle.textContent = "Projects";

const projectsContainer = document.createElement("div");
projectsContainer.id = "projects-container";

const projectsList = document.createElement("ul");
projectsList.id = "projects-ul";
const addProjectButton = document.createElement("li");
addProjectButton.className = "add-projects";
addProjectButton.textContent = "+ Add Project";

addProjectButton.addEventListener("click", function () {
  let res = addProject();
  console.log(`res value: ${res}`);
  // projects.push(res);
  // if statement to add item to array if no previous items exist
  if (projects.length < 1) {
    projects.push(res);
    console.log(`Executed.`);
    projectListSetter(res, projectsList);
  }

  // if statement to check if project does not already exist

  for (let i = 0; i < projects.length; i++) {
    console.log(projects.includes(res));
    if (!projects.includes(res)) {
      projects.push(res);
      console.log(`Executed as well. Projects now has: ${projects}`);
      projectListSetter(res, projectsList);
    }
  }

  console.log(`projects current values: ${projects}`);
  console.log(typeof projects);
  console.log(`projects length: ${projects.length}`);
});
projectsList.appendChild(addProjectButton);
projectsContainer.appendChild(projectsList);

body.appendChild(topBar);
topBar.appendChild(appTitle);

body.appendChild(leftSideBar);

leftSideBar.appendChild(projectsTitle);
leftSideBar.appendChild(projectsContainer);

export { body };
