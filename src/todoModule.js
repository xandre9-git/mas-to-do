// TO DO MODULES

// this function gets project name and stores as a string
function addProject(){
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
    console.log(typeof str);
    console.log(str.projects);
    return node;
  }
} 
 
// this function creates the list item on the DOM
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

export { addProject, createListItem, projectListSetter };