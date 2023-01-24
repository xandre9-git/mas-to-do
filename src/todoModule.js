import { body } from "./pageLayout";

function Projects(title) {
  this.title = title;
}

let projects = [];


function toDo(){
  // to-do list app code
  // this is to execute when user clicks the + button.
}

// this function adds project name to array
function addProject(){
  // implement addeventlistener for click of add project button
  // button is pressed
  // prompt needs to display
  // user types name of project
  // project gets displayed above '+ Add Project'
  let projectName = prompt("Enter name of project:");
  // projectName is a string to use as the textContent of a created li
  if (projectName != null) {
    projects.push(projectName);
  }
  return { projectName, projects };
}

function createListItem(listName) {
  let listItem = document.createElement('li');
  listItem.textContent = listName;

  // create project button container
  let projectBtns = document.createElement('div');
  projectBtns.className = "project-btns-container";

  // create edit button
  let projectEditBtn = document.createElement('div');
  projectEditBtn.className = "project-btns, filter-white"
  projectEditBtn.id = "edit-btn";
  projectEditBtn.title = "Edit";
 
  // create delete button
  let projectDelBtn = document.createElement('div');
  projectDelBtn.className = "project-btns";
  projectDelBtn.id = "del-btn";
  projectDelBtn.className = "project-btns filter-white";
  projectDelBtn.title = "Delete"
  

  projectBtns.appendChild(projectEditBtn);
  projectBtns.appendChild(projectDelBtn);
  
  listItem.appendChild(projectBtns);

  return listItem;
}

export { addProject, createListItem, projects };