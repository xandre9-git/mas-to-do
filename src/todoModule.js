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
    projects.push(projectName);
  }
  return { projectName, projects };
}

function createListItem(listName) {
  let listItem = document.createElement('li');
  listItem.textContent = listName;

  // create project button container
  let projectBtns = document.createElement('div');
  projectBtns.className = "project-btns";

  // create edit button
  let projectEditBtn = document.createElement('button');
  projectEditBtn.type = "button";
  // projectEditBtn.className = "project-btns"
  projectEditBtn.id = "edit-btn";
  let editBtnImg = document.createElement('img');
  editBtnImg.src = "/src/images/edit.svg";
  editBtnImg.className = "project-btns filter-white";
 
  editBtnImg.title = "Edit";
  projectEditBtn.appendChild(editBtnImg);

   // create delete button
  let projectDelBtn = document.createElement('button');
  projectDelBtn.type = "button";
  // projectDelBtn.className = "project-btns";
  projectDelBtn.id = "del-btn";
  let delBtnImg = document.createElement('img');
  delBtnImg.src = "/src/images/delete.svg";
  delBtnImg.className = "project-btns filter-white";
  delBtnImg.title = "Delete"
  projectDelBtn.appendChild(delBtnImg);
  
  projectBtns.appendChild(projectEditBtn);
  projectBtns.appendChild(projectDelBtn);
  listItem.appendChild(projectBtns);


 
  return listItem;
}

export { addProject, createListItem, projects };