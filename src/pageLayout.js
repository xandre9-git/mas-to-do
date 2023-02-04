import { addProject } from "./todoModule";
import { createListItem } from "./todoModule";
import { projects } from "./dataStorage";
import { projectListSetter } from "./todoModule";
import { DOMProjectAdder } from "./todoModule";
import { deleteProject } from "./todoModule";


console.log(JSON.parse(window.localStorage.getItem("projectnames")));
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

const todoBoardsContainer = document.createElement('div');
todoBoardsContainer.id = "to-dos-container";

const currentContainer = document.createElement("div");
currentContainer.className = "task-boxes-container";

// current tasks DOM

const currentTaskContainer = document.createElement("div");
currentTaskContainer.id = "current-tasks"

const currentTasksTitle = document.createElement("h2");
currentTasksTitle.className = "to-do-title";
currentTasksTitle.textContent = "Current Tasks";
currentTaskContainer.appendChild(currentTasksTitle);

const currentTasks = document.createElement("div");
currentTasks.className = "to-do-boxes";
currentTaskContainer.appendChild(currentTasks);

const currentTaskList = document.createElement("ul");
currentTaskList.id = "current-tasks-ul";

const addTaskLi = document.createElement("li");
addTaskLi.className = "add-task-li";
addTaskLi.textContent = "";

// const addTaskContainer = document.createElement("div");
// addTaskContainer.className = "taskbar";

// implement soon
// const addTaskInput = document.createElement("input");
// addTaskInput.placeholder = "Add a task to complete"

const addTaskBtn = document.createElement("div");
addTaskBtn.textContent = "+";
addTaskBtn.id = "add-task-btn";
currentTaskList.appendChild(addTaskBtn);

// task details DOM

const taskDetailsContainer = document.createElement("div");
taskDetailsContainer.id = "task-details";

const taskDetailsTitle = document.createElement("h2");
taskDetailsTitle.className = "to-do-title";
taskDetailsTitle.textContent = "Details";
taskDetailsContainer.appendChild(taskDetailsTitle);

const taskDetails = document.createElement("div");
taskDetails.className = "to-do-boxes";
taskDetailsContainer.appendChild(taskDetails);

// add project to DOM
addProjectButton.addEventListener("click", DOMProjectAdder);

// for loop to add existing projects into projects section on DOM
for (let i = 0; i < window.projects.length; i++) {
  projectListSetter(projects[i], projectsList);
}

// appends
projectsList.appendChild(addProjectButton);
projectsContainer.appendChild(projectsList);
body.appendChild(topBar);
topBar.appendChild(appTitle);
body.appendChild(leftSideBar);

currentContainer.appendChild(currentTaskContainer);
currentContainer.appendChild(taskDetailsContainer);

todoBoardsContainer.appendChild(currentContainer);
body.appendChild(todoBoardsContainer);

leftSideBar.appendChild(projectsTitle);
leftSideBar.appendChild(projectsContainer);

// edit project name
const editBtn = document.querySelectorAll("#edit-btn");
const editBtnArr = Array.from(editBtn);
editBtnArr.forEach((e, i) => {
  e.addEventListener("click", function test(){
    console.log(`editBtnArr[i]: ${editBtnArr[i].closest(".added-projects").id}`);
    const index = projects.indexOf(editBtnArr[i].closest(".added-projects").id);
    console.log(index);
    let editName = prompt('Edit name:');
    if (editName != null && !projects.includes(editName)) {
      console.log('This if statement executed.')
      projects[index] = editName;
      console.log(projects);
      window.localStorage.setItem("projectnames", JSON.stringify(projects))    
    }
    document.location.reload();
  })
})


// delete project
const delBtn = document.querySelectorAll("#del-btn");
const delBtnArr = Array.from(delBtn);
delBtnArr.forEach((e, i) => {
  e.addEventListener("click", function announce() {
    // (delBtnArr[i].closest(".added-projects").id) is used to select id of grandparent of delete button clicked;
    let projectName = delBtnArr[i].closest(".added-projects").id;
    projects = deleteProject(projectName, projects);
    window.localStorage.setItem("projectnames", JSON.stringify(projects));
  });
});

export { body, projectsList };
