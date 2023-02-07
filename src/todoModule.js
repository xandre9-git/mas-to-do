// TO DO MODULES

import { projects } from "./dataStorage";
import { projectsList } from "./pageLayout";
import format from "date-fns/format";

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

// current to-do's
function addTask(desc) {
  const taskContainer = document.createElement("ul");
  taskContainer.id = "tasks";
  const taskDesc = document.createElement("li");
  taskDesc.className = "checklist-task-item";
  taskDesc.textContent = desc;
  const taskCheckBox = document.createElement("input");
  taskCheckBox.type = "checkbox";
  const taskEditBtn = document.createElement("div");
  taskEditBtn.className = "task-btns";
  taskEditBtn.id = "task-edit-btn";
  taskEditBtn.title = "Edit";
  const taskDelBtn = document.createElement("div");
  taskDelBtn.className = "task-btns";
  taskDelBtn.id = "task-del-btn";
  taskDelBtn.title = "Delete";
  const taskBtnsContainer = document.createElement("div");
  taskBtnsContainer.className = "task-btns-container";

  taskContainer.appendChild(taskDesc);
  taskBtnsContainer.appendChild(taskCheckBox);
  // taskBtnsContainer.appendChild(taskEditBtn);
  // taskBtnsContainer.appendChild(taskDelBtn);
  taskContainer.appendChild(taskBtnsContainer);
  // get project name and create an editable board allowing user to add tasks
  // use checkboxes
  // design: static dimensions vs dynamic. dynamic for mobile responsiveness
  // object needs to be created to host project to-do's
  // logic implementation separate from design

  return taskContainer;
}

// edit task details
function editTaskDetails() {
  // document.querySelector("#task-details > div")
  const taskDetailsContainer = document.createElement("ul");
  taskDetailsContainer.id = "details";

  const projectTitle = document.createElement("h3");
  projectTitle.textContent = "Project";

  const projectSelect = document.createElement("select");
  projectSelect.id = "project-selector";
  const defaultOptionValue = document.createElement("option");
  defaultOptionValue.textContent = "None";
  projectSelect.appendChild(defaultOptionValue);

  projects.forEach((element) => {
    console.log(`element: ${element}`);
    const projectsInput = document.createElement("select");
    projectsInput.id = "project-selector";
    const optionValue = document.createElement("option");
    optionValue.textContent = element;
    projectSelect.appendChild(optionValue);
  });

  const dateTitle = document.createElement("h3");
  dateTitle.textContent = "Date Due";
  const dateInput = document.createElement("input");
  dateInput.type = "date";

  const priorityTitle = document.createElement("h3");
  priorityTitle.textContent = "Task Priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.id = "priority-selector";
  const defaultPriority = document.createElement("option");
  defaultPriority.textContent = "None";
  const lowPriority = document.createElement("option");
  lowPriority.textContent = "Low";
  const medPriority = document.createElement("option");
  medPriority.textContent = "Medium";
  const highPriority = document.createElement("option");
  highPriority.textContent = "High";
  prioritySelect.appendChild(defaultPriority);
  prioritySelect.appendChild(lowPriority);
  prioritySelect.appendChild(medPriority);
  prioritySelect.appendChild(highPriority);

  const timeTitle = document.createElement("h3");
  timeTitle.textContent = "Time Due";
  const timeInput = document.createElement("input");
  timeInput.type = "time";

  const descTitle = document.createElement("h3");
  descTitle.textContent = "Description";
  const descInput = document.createElement("textarea");
  descInput.id = "detail-desc";
  descInput.placeholder = "Enter description.";

  taskDetailsContainer.appendChild(projectTitle);
  taskDetailsContainer.appendChild(projectSelect);
  taskDetailsContainer.appendChild(dateTitle);
  taskDetailsContainer.appendChild(dateInput);
  taskDetailsContainer.appendChild(timeTitle);
  taskDetailsContainer.appendChild(timeInput);
  taskDetailsContainer.appendChild(priorityTitle);
  taskDetailsContainer.appendChild(prioritySelect);
  taskDetailsContainer.appendChild(descTitle);
  taskDetailsContainer.appendChild(descInput);

  function setSelectWidth() {
    let width = 0;
    for (let i = 0; i < projectSelect.options.length; i++) {
      if (projectSelect.options[i].text.length > width) {
        width = projectSelect.options[i].text.length;
      }
    }
    projectSelect.style.width = width + 4 + "ch";

    for (let i = 0; i < prioritySelect.options.length; i++) {
      if (prioritySelect.options[i].text.length > width) {
        width = prioritySelect.options[i].text.length;
      }
    }
    prioritySelect.style.width = width + 4 + "ch";

  }

  window.addEventListener("load", setSelectWidth);
  return taskDetailsContainer;
}

export {
  addProject,
  createListItem,
  projectListSetter,
  DOMProjectAdder,
  deleteProject,
  addTask,
  editTaskDetails,
};
