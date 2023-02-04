// TO DO MODULES

import { projects } from "./dataStorage";
import { projectsList } from "./pageLayout";

// this function gets project name and stores as a string
function addProject() {
  let projectName = prompt("Enter name of project:");
  // projectName is a string used as the textContent of created list item
  if (projectName != null) {
    return projectName;
  }
}

// this function takes string of project name, gives it a class name, an id, checks that it is not empty, and prepends it to the desired node
function projectListSetter(str, node) {
  let project = createListItem(str);
  project.className = "added-projects";
  project.id = project.textContent;
  if (project.textContent != "") {
    node.prepend(project);
    return node;
  }
}

// this function creates the list item on the DOM
function createListItem(listName) {
  let listItem = document.createElement("li");
  listItem.textContent = listName;

  // create project button container
  let projectBtns = document.createElement("div");
  projectBtns.className = "project-btns-container";

  // create edit button
  let projectEditBtn = document.createElement("div");
  projectEditBtn.className = "project-btns, filter-white";
  projectEditBtn.id = "edit-btn";
  projectEditBtn.title = "Edit";

  // create delete button
  let projectDelBtn = document.createElement("div");
  projectDelBtn.className = "project-btns";
  projectDelBtn.id = "del-btn";
  projectDelBtn.className = "project-btns filter-white";
  projectDelBtn.title = "Delete";

  // append elements
  projectBtns.appendChild(projectEditBtn);
  projectBtns.appendChild(projectDelBtn);
  listItem.appendChild(projectBtns);

  return listItem;
}

// this function ties it all together
function DOMProjectAdder() {
  let res = addProject();
  if (res != null) {
    console.log(`res value: ${res}`);
    window.localStorage.setItem("projectname", res);
    // if statement to add item to array if no previous items exist
    if (projects.length < 1) {
      projects.push(res);
      // use local storage
      window.localStorage.setItem("projectnames", JSON.stringify(projects));
      projectListSetter(res, projectsList);
    }

    // for loop and if statement to check if project does not already exist
    for (let i = 0; i < projects.length; i++) {
      console.log(projects.includes(res));
      if (!projects.includes(res)) {
        projects.push(res);
        window.localStorage.setItem("projectnames", JSON.stringify(projects));
        projectListSetter(res, projectsList);
        document.location.reload();
      }
    }
  }
  allTasks();
  return projectListSetter;
}

// delete project function
function deleteProject(projectname, arr) {
  // get target project and delete it from database
  const index = arr.indexOf(projectname);
  let x = arr.splice(index, 1);
  document.location.reload();
  return arr;
}

// to do boards

// upon clicking project name all three boards (past, present, and future) need to be displayed
function allTasks(){

  console.log(todoBoardsContainer);
  alert('Alert');
}

// present to-do's
function presentTasks(projectName, input) {
  console.log(`Current to-do's: ${projectName}`);
  const todo = {
    checkbox: description,
  };
  // get project name and create an editable board allowing user to add tasks
  // use checkboxes
  // design: static dimensions vs dynamic. dynamic for mobile responsiveness
  // needs title: 'Present'
  // object needs to be created to host project to-do's
  // logic implementation separate from design
  const listItem = document.createElement('li');
  
}

// future to-do's
function futureTasks() {
  console.log(`future to-do's`);
}

// past to-do's
function pastTasks() {
  console.log(`past to-do's`);
}

export {
  addProject,
  createListItem,
  projectListSetter,
  DOMProjectAdder,
  deleteProject,
};
