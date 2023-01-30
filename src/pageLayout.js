import { addProject } from "./todoModule";
import { createListItem } from "./todoModule";
import { projects } from "./dataStorage";
import { projectListSetter } from "./todoModule";

if (JSON.parse(window.localStorage.getItem("projectnames")).length > 0) {
  window.projects = JSON.parse(window.localStorage.getItem("projectnames"));
  console.log(`Projects array inside JSON parse: ${window.projects}`);
  console.log("JSON parse section fired.");
} else {
  projects = [];
}

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
  window.localStorage.setItem("projectname", res);
  // if statement to add item to array if no previous items exist
  if (projects.length < 1) {
    projects.push(res);
    // use local storage
    window.localStorage.setItem("projectnames", JSON.stringify(projects));
    console.log(`Executed.`);
    projectListSetter(res, projectsList);
  }

  // for loop and if statement to check if project does not already exist
  for (let i = 0; i < projects.length; i++) {
    console.log(projects.includes(res));
    if (!projects.includes(res)) {
      projects.push(res);
      window.localStorage.setItem("projectnames", JSON.stringify(projects));
      console.log(`Executed as well. Projects now has: ${projects}`);
      projectListSetter(res, projectsList);
    }
  }

  console.log(`projects current values: ${projects}`);
  console.log(`projects length: ${projects.length}`);
});

// for loop to add existing projects into projects section on DOM
for (let i = 0; i < window.projects.length; i++) {
  console.log(`This calls ${i}`);
  console.log(window.projects);
  projectListSetter(projects[i], projectsList);
}

projectsList.appendChild(addProjectButton);
projectsContainer.appendChild(projectsList);

body.appendChild(topBar);
topBar.appendChild(appTitle);

body.appendChild(leftSideBar);

leftSideBar.appendChild(projectsTitle);
leftSideBar.appendChild(projectsContainer);

export { body };
