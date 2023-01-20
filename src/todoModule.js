import { body } from "./pageLayout";

function Projects(title) {
  this.title = title;
}

let projects = [];


function toDo(){
  // to-do list app code
  // this is to execute when user clicks the + button.
}

function addProject(){
  // implement addeventlistener for click of add project button
  // button is pressed
  // prompt needs to display
  // user types name of project
  // project gets displayed above '+ Add Project'
  let projectName = prompt("Enter name of project:");
  // projectName is a string to use as the textContent of a created li
  if (projectName != null) {
    console.log(projectName);
    projects.push(projectName);
  }

  console.log(projects);
  console.log(body);
  
  return projectName;
}

function createListItem(listName) {
  let listItem = document.createElement('li');
  listItem.textContent = listName;
  return listItem;
}

export { addProject, createListItem };