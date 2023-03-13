import { projects } from "./dataStorage";
import { projectListSetter } from "./todoModule";
import { DOMProjectAdder } from "./todoModule";
import { deleteProject } from "./todoModule";
import { addTask } from "./todoModule";
import { editTaskDetailsDOM } from "./todoModule";
import { Task } from "./todoModule";
import { projectTasks } from "./dataStorage";
import { editTaskDetails } from "./todoModule";

// PROJECT NAMES
// Get the projectnames from local storage or use an empty array if null
projects = JSON.parse(window.localStorage.getItem("projectnames")) || [
  "My Tasks",
];
console.log(`projects array: ${projects}`);
console.log(`Type of projects array: ${typeof projects}`);

// PROJECT TASKS
// Get the projectTasks from local storage or use a default object if null
projectTasks = JSON.parse(window.localStorage.getItem("projectTasks")) || [
  {
    projectName: "My Tasks",
    currentTasks: [],
    completedTasks: [],
  },
];
console.log("projectTasks array: ", projectTasks);
console.log(`Type of projectTasks array: ${typeof projectTasks}`);

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

const todoBoardsContainer = document.createElement("div");
todoBoardsContainer.id = "to-dos-container";

const currentContainer = document.createElement("div");
currentContainer.className = "task-boxes-container";

// current tasks DOM

const currentTaskContainer = document.createElement("div");
currentTaskContainer.id = "current-tasks";

const currentTasksTitle = document.createElement("h2");
currentTasksTitle.className = "to-do-title";
currentTasksTitle.textContent = "Tasks";
currentTaskContainer.appendChild(currentTasksTitle);

const currentTasks = document.createElement("div");
currentTasks.className = "to-do-boxes";
currentTaskContainer.appendChild(currentTasks);

const addTaskContainer = document.createElement("form");
addTaskContainer.id = "add-taskbar";

const addTaskInput = document.createElement("input");
addTaskInput.id = "task-input-bar";
addTaskInput.placeholder = "Add a task to complete";
addTaskContainer.appendChild(addTaskInput);

// add task button
const addTaskBtn = document.createElement("button");
addTaskBtn.textContent = "+";
addTaskBtn.type = "submit";
addTaskBtn.id = "add-task-btn";
addTaskContainer.appendChild(addTaskBtn);

// Add a task to the current project
addTaskBtn.addEventListener("click", (e) => {
  // Get the input value
  let taskInput = document.getElementById("task-input-bar").value;
  if (taskInput != "") {
    // Clear the input bar
    document.getElementById("task-input-bar").value = "";
    // Create a new task object
    // this variable needs to be dynamic and select the correct project for its second parameter
    const newTaskItem = new Task(taskInput, 0);
    // Append the task to the current tasks list
    currentTasks.appendChild(addTask(newTaskItem.title));
    // location.reload();
    localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
    // e.preventDefault();
  }
});

currentTasks.appendChild(addTaskContainer);

// SHOW ALL TASKS ON PAGE
// this needs to show the My Tasks project by default
// i will use this later on for all tasks to show under the "All Tasks" project
// projectTasks?.forEach((project) => {
//   const projectName = project.projectName;
//   project.currentTasks.forEach((currentTask) => {
//     console.log(`currentTask (${projectName}): ${currentTask.title}`);
//     currentTasks.appendChild(addTask(currentTask.title));
//   });
//   project.completedTasks.forEach((completedTask) => {
//     if (Array.isArray(completedTask)) {
//       // if the completedTask is an array, loop through its items
//       completedTask.forEach((subtask) => {
//         console.log(`completedTask (subtask) (${projectName}): ${subtask.title}`);
//         currentTasks.appendChild(addTask(subtask.title, true));
//       });
//     } else {
//       // if the completedTask is an object, add it as a single task
//       console.log(`completedTask (${projectName}): ${completedTask.title}`);
//       currentTasks.appendChild(addTask(completedTask.title, true));
//     }
//   });
// });

projectTasks.forEach((project) => {
  const projectName = project.projectName;
  if (projectName !== "My Tasks") {
    return; // skip this project
  }
  project.currentTasks.forEach((currentTask) => {
    console.log(`currentTask (${projectName}): ${currentTask.title}`);
    currentTasks.appendChild(addTask(currentTask.title));
  });
  project.completedTasks.forEach((completedTask) => {
    if (Array.isArray(completedTask)) {
      // if the completedTask is an array, loop through its items
      completedTask.forEach((subtask) => {
        console.log(
          `completedTask (subtask) (${projectName}): ${subtask.title}`
        );
        currentTasks.appendChild(addTask(subtask.title, true));
      });
    } else {
      // if the completedTask is an object, add it as a single task
      console.log(`completedTask (${projectName}): ${completedTask.title}`);
      currentTasks.appendChild(addTask(completedTask.title, true));
    }
  });
});

const currentTaskList = document.createElement("ul");
currentTaskList.id = "current-tasks-ul";

const addTaskLi = document.createElement("li");
addTaskLi.className = "add-task-li";
addTaskLi.textContent = "";

// task details DOM

const taskDetailsContainer = document.createElement("div");
taskDetailsContainer.id = "task-details";
taskDetailsContainer.style.display = "none";

const taskDetailsTitle = document.createElement("h2");
taskDetailsTitle.className = "to-do-title";
taskDetailsTitle.textContent = "Details";
taskDetailsContainer.appendChild(taskDetailsTitle);

const taskDetails = document.createElement("div");
taskDetails.className = "to-do-boxes";
taskDetailsContainer.appendChild(taskDetails);

// const detailsPane = editTaskDetailsDOM();

// taskDetails.appendChild(detailsPane);

// add project to DOM
addProjectButton.addEventListener("click", DOMProjectAdder);

// forEach to add existing projects into projects section on DOM
projects?.forEach((project) => {
  projectListSetter(project, projectsList);
});

// projects that are clicked need to show their tasks
projectsList.addEventListener("click", (e) => {
  // get the project name
  const projectName = e.target.textContent;
  console.log(`projectName: ${projectName}`);
  // get the project object
  console.log(`projects: ${projects}`);
  // code below needs an if statement to check if the project is in the projects array
  // if it is, then it will run the code below
  const project = projectTasks.find(
    (project) => project.projectName === projectName
  );
  if (!project) {
    console.log(`Project '${projectName}' not found in projectTasks array.`);
    return;
  }
  // get the project's tasks
  const projectTaskz = project.currentTasks;
  // clear the current tasks
  currentTasks.innerHTML = "";
  // add the task input bar
  currentTasks.appendChild(addTaskContainer);
  // add the project's tasks to the DOM
  projectTaskz.forEach((task) => {
    // need to add task input bar as well
    console.log(`Testing to see if this works: ${task.title}`);
    // currentTasks.appendChild(addTaskContainer);
    currentTasks.appendChild(addTask(task.title));
    currentTasks.addEventListener("click", function details() {
      console.log(`task: ${task.title}`);
      // save the clicked task's title as a global variable
      selectedTaskTitle = task.textContent.trim();
      console.log(`selectedTaskTitle: ${selectedTaskTitle}`);

      // create the details pane
      const detailsPane = editTaskDetailsDOM(selectedTaskTitle);

      // check if the details pane already exists
      const existingDetailsPane = document.querySelector(".details-pane");

      if (
        existingDetailsPane &&
        existingDetailsPane.textContent.trim() === selectedTaskTitle
      ) {
        // if it does exist and matches the current task, do nothing
        return;
      }

      // if it does exist but doesn't match, remove it
      if (existingDetailsPane) {
        existingDetailsPane.parentNode.removeChild(existingDetailsPane);
      }

      // add the new details pane
      taskDetails.appendChild(detailsPane);

      // set the color of the previously clicked task to black
      if (prevClickedTask) {
        prevClickedTask.style.color = "";
      }

      // set the color of the newly clicked task
      task.style.color = "#BF40BF";

      // set the taskDetailsContainer to display block
      taskDetailsContainer.style.display = "block";

      // set the current task as the previously clicked task
      prevClickedTask = task;
    });
  });
});

// appends
// Create a function to append multiple elements to a parent element
function appendElements(parent, ...children) {
  for (let child of children) {
    parent.appendChild(child);
  }
}

// Use the function to refactor the code
appendElements(projectsList, addProjectButton);
appendElements(projectsContainer, projectsList);
appendElements(topBar, appTitle);
appendElements(body, topBar, leftSideBar, todoBoardsContainer);
appendElements(currentContainer, currentTaskContainer, taskDetailsContainer);
appendElements(todoBoardsContainer, currentContainer);
appendElements(leftSideBar, projectsTitle, projectsContainer);

// edit project name
const editBtn = document.querySelectorAll("#edit-btn");
const editBtnArr = Array.from(editBtn);
editBtnArr.forEach((e, i) => {
  e.addEventListener("click", function test() {
    console.log(
      `editBtnArr[i]: ${editBtnArr[i].closest(".added-projects").id}`
    );
    const index = projects.indexOf(editBtnArr[i].closest(".added-projects").id);
    console.log(index);
    let editName = prompt("Edit name:");
    if (editName != null && !projects.includes(editName)) {
      console.log("This if statement executed.");
      projects[index] = editName;
      console.log(projects);
      window.localStorage.setItem("projectnames", JSON.stringify(projects));
    }
    document.location.reload();
  });
});

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

const allTasks = document.querySelectorAll("div.checklist-task-item");

const allTasksArr = Array.from(allTasks);
let prevClickedTask = null;
let selectedTaskTitle = "";

allTasksArr.forEach((task) => {
  task.childNodes[0].addEventListener("click", function details() {
    console.log(`task: ${task.textContent}`);
    // save the clicked task's title as a global variable
    selectedTaskTitle = task.textContent.trim();
    console.log(`selectedTaskTitle: ${selectedTaskTitle}`);

    // create the details pane
    const detailsPane = editTaskDetailsDOM(selectedTaskTitle);

    // check if the details pane already exists
    const existingDetailsPane = document.querySelector(".details-pane");

    if (
      existingDetailsPane &&
      existingDetailsPane.textContent.trim() === selectedTaskTitle
    ) {
      // if it does exist and matches the current task, do nothing
      return;
    }

    // if it does exist but doesn't match, remove it
    if (existingDetailsPane) {
      existingDetailsPane.parentNode.removeChild(existingDetailsPane);
    }

    // add the new details pane
    taskDetails.appendChild(detailsPane);

    // set the color of the previously clicked task to black
    if (prevClickedTask) {
      prevClickedTask.style.color = "";
    }

    // set the color of the newly clicked task
    task.style.color = "#BF40BF";

    // set the taskDetailsContainer to display block
    taskDetailsContainer.style.display = "block";

    // set the current task as the previously clicked task
    prevClickedTask = task;
  });
});

export {
  body,
  projectsList,
  currentContainer,
  currentTaskContainer,
  currentTasksTitle,
  currentTasks,
  addTaskContainer,
  addTaskInput,
};
