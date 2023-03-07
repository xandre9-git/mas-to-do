// MODULES

import { projects } from "./dataStorage";
import { projectTasks } from "./dataStorage";
import { currentTasks, projectsList, selectedTaskTitle } from "./pageLayout";
import format from "date-fns/format";

// ADD PROJECT
// this function gets project name and stores as a string
function addProject() {
  return prompt("Enter name of project:");
}

// PROJECT LIST SETTER
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

// CREATE PROJECT LIST ITEMS
// this function creates project list items
function createListItem(listName) {
  const projectBtns = document.createElement("div");
  projectBtns.className = "project-btns-container";

  const projectEditBtn = document.createElement("div");
  projectEditBtn.className = "project-btns filter-white";
  projectEditBtn.id = "edit-btn";
  projectEditBtn.title = "Edit";

  const projectDelBtn = document.createElement("div");
  projectDelBtn.className = "project-btns filter-white";
  projectDelBtn.id = "del-btn";
  projectDelBtn.title = "Delete";

  projectBtns.appendChild(projectEditBtn);
  projectBtns.appendChild(projectDelBtn);

  const listItem = document.createElement("li");
  listItem.textContent = listName;
  listItem.appendChild(projectBtns);

  return listItem;
}

// EDIT TASK BUTTON
function createEditButton() {
  const editBtn = document.createElement("div");
  editBtn.className = "task-edit-btn";
  return editBtn;
}

// DOM PROJECT ADDER
// this function ties addProject() and projectListSetter() together
function DOMProjectAdder() {
  let res = addProject();
  if (res != null && !projects.includes(res)) {
    projects.push(res);
    window.localStorage.setItem("projectnames", JSON.stringify(projects));
    // "projectnames" needs to push an object with the projectName as the key and res as the value in projectTasks array, as well as a currentTasks array and completedTasks array
    projectTasks.push({ projectName: res, currentTasks: [], completedTasks: [] } );
    console.log(`projectTasks in DOMProjectAdder: ${projectTasks}`)
    localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
    projectListSetter(res, projectsList);
    console.log(`res value: ${res}`);
    window.localStorage.setItem("projectname", res);
  }
  return projectListSetter;
}

// DELETE PROJECT
function deleteProject(projectname, arr) {
  const projectIndex = arr.indexOf(projectname);
  arr.splice(projectIndex, 1);
  location.reload();
  return arr;
}

// TO DO BOARD MODULES

// ADD TASK MODULE
// this function adds a task to the Tasks panel
function addTask(desc, isCompleted) {
  if (!desc) {
    return; // check for falsy values and return early
  }

  const taskContainer = createTaskContainer(desc);
  taskContainer.classList.add("checklist-task-item");

  // get the first child of taskContainer (the description text node)
  const descriptionTextNode = taskContainer.firstChild;
  // get the text content of the description text node
  const descriptionText = descriptionTextNode.textContent;

  const editBtn = createEditButton();
  editBtn.addEventListener("click", function () {
    // if task is not completed, make the description text node contenteditable
    if (!isCompleted) {
      // make the description text node contenteditable
      descriptionTextNode.contentEditable = true;
      // set focus to the description text node
      descriptionTextNode.focus();
      const range = document.createRange();
      range.selectNodeContents(descriptionTextNode);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });

  const taskCheckBox = createCheckbox();
  taskCheckBox.classList.add("task-checkbox");
  taskCheckBox.checked = isCompleted;
  taskCheckBox.addEventListener("change", function () {
    if (this.checked) {
      completeTask.bind(this)();
    } else {
      unCompleteTask.bind(this)();
    }
  });

  const editAndCheckBoxContainer = document.createElement("div");
  editAndCheckBoxContainer.classList.add("edit-and-checkbox-container");
  editAndCheckBoxContainer.appendChild(editBtn);
  editAndCheckBoxContainer.appendChild(taskCheckBox);
  taskContainer.appendChild(editAndCheckBoxContainer);

  if (isCompleted) {
    taskContainer.classList.add("completed");
    taskContainer.style.textDecoration = "line-through";
    // remove the edit button
    editAndCheckBoxContainer.removeChild(editBtn);
  }

  descriptionTextNode.addEventListener("blur", function () {
    descriptionTextNode.contentEditable = false;
    const newDesc = descriptionTextNode.textContent.trim();
    if (newDesc) {
      desc = newDesc;
      projectTasks.currentTasks.forEach((task) => {
        if (task.title === descriptionText) {
          task.title = newDesc;
          localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
          location.reload();
        }
      });
    }
  });
  
  return taskContainer;
}


// PROJECT SELECTION MODULE
// this function selects a project from the project list
function projectSelection(task) {
  
}

// TASKS

// CREATE TASK CONTAINER
// This function creates a div element with the class "task" and is used to contain the task description and checkbox
function createTaskContainer(desc) {
  const taskContainer = document.createElement("div");
  taskContainer.className = "task";
  const taskDesc = document.createElement("div");
  taskDesc.className = "checklist-task-item";
  taskDesc.textContent = desc;
  taskContainer.appendChild(taskDesc);
  return taskContainer;
}

// COMPLETE TASK
// This function is called when the checkbox is checked
function completeTask() {
  // Get the description of the task that was just checked
  let taskDescription = this.parentNode.parentNode.firstChild;
  console.log(`taskDescription: ${taskDescription}`);

  // If the checkbox is checked:
  if (this.checked) {
    // Add a line through the task description to indicate that it's been completed
    taskDescription.style.setProperty("text-decoration", "line-through");
    // reload the page
    location.reload();

    // Define a new function called moveTaskToCompleted, and bind it to the checkbox element
    (function moveTaskToCompleted() {
      // Get the ID of the task from the value of the checkbox
      let taskId = taskDescription.textContent;

      // Match the taskId with the index of the task in the currentTasks array
      let taskIndex = projectTasks[0].currentTasks.findIndex((task) => {
        return taskId == task.title;
      });

      // Remove the task from the currentTasks array
      let [task] = projectTasks[0].currentTasks.splice(taskIndex, 1);

      // Add a DateCompleted property to the task object
      task.DateCompleted = new Date();

      // Add the task to the completedTasks array
      projectTasks[0].completedTasks.push(...[task]);

      // Save the updated projectTasks array to local storage
      localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
    }.bind(this)());

    // If the checkbox is unchecked:
  } else {
    // Remove the line-through from the task description
    taskDescription.style.removeProperty("text-decoration");
  }
}

// UN-COMPLETE TASK
// This function is called when a task is unchecked
function unCompleteTask() {
  // Get the description of the task that was just unchecked
  let text = this.parentNode.parentNode.firstChild;

  // If the checkbox is not checked:
  if (!this.checked) {
    // Remove the line-through from the task description
    text.style.removeProperty("text-decoration");
    location.reload();

    // Define a new function called moveTaskToCurrent, and bind it to the checkbox element
    function moveTaskToCurrent() {
      // Get the ID of the task from the text content of the task description
      let taskId = text.textContent;

      // Match the taskId with the title of the task in the completedTasks array
      let taskIndex = projectTasks[0].completedTasks.findIndex((task) => {
        return task.title == taskId;
      });

      // Remove the task from the completedTasks array
      let [task] = projectTasks[0].completedTasks.splice(taskIndex, 1);

      // Delete the DateCompleted property from the task object
      delete task.DateCompleted;

      // Add the task to the currentTasks array
      projectTasks[0].currentTasks.push(task);

      // Save the updated projectTasks array to local storage
      localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
    }

    // Call the moveTaskToCurrent function
    moveTaskToCurrent.call(this);

    // If the checkbox is checked:
  } else {
    // Add a line through the task description to indicate that it's still incomplete
    text.style.setProperty("text-decoration", "line-through");
  }
}

// CHECKBOX CREATOR
function createCheckbox() {
  const checkbox = document.createElement("input"); // rename variable
  checkbox.type = "checkbox";
  return checkbox;
}

// TASK OBJECT CREATOR
function Task(title, projectIndex) {
  if (title !== "") {
    let currentIds = [];
    let completedIds = [];

    // Get the current and completed tasks of the project
    projectTasks[projectIndex].currentTasks.forEach((task) => {
      currentIds.push(task.id);
    });

    projectTasks[projectIndex].completedTasks.forEach((task) => {
      completedIds.push(task.id);
    });

    // Find a unique id for the new task
    let newId = 1;
    while (currentIds.includes(newId) || completedIds.includes(newId)) {
      newId++;
    }

    let newTask = {
      id: newId,
      title: title,
      desc: "",
      dateDue: new Date(),
      timeDue: "",
      priority: "None",
    };

    // Push the new task to the correct project
    projectTasks[projectIndex].currentTasks.push(newTask);
    window.localStorage.setItem("projectTasks", JSON.stringify(projectTasks));

    return newTask;
  }
}

class TaskDetails {
  constructor(id, title, projectName, dateDue, timeDue, priority, desc) {
    this.id = id;
    this.title = title;
    this.projectName = projectName;
    this.dateDue = dateDue;
    this.timeDue = timeDue;
    this.priority = priority;
    this.desc = desc;
  }
}

function editTaskDetails(taskTitle, projectName) {
  const project = projectTasks.find((project) => project.projectName === projectName);

  if (!project) {
    console.error(`Project "${projectName}" not found.`);
    return;
  }

  const task = project.currentTasks.find((task) => task.title === taskTitle);

  if (!task) {
    console.error(`Task "${taskTitle}" not found in project "${projectName}".`);
    return;
  }

  const taskTitleInput = taskTitle;
  console.log(`taskTitleInput: ${taskTitleInput}`);
  const projectSelector = document.getElementById("project-selector");
  const dateDueInput = document.getElementById("date-due");
  const timeDueInput = document.getElementById("time-due");
  const prioritySelector = document.getElementById("priority-selector");
  const taskDescriptionInput = document.getElementById("task-description");

  const taskDetails = new TaskDetails(
    task.id,
    taskTitleInput,
    projectSelector.value,
    dateDueInput.value,
    timeDueInput.value,
    prioritySelector.value,
    taskDescriptionInput.value
  );
  
  const taskProject = projectTasks.find((project) => project.projectName === taskDetails.projectName);
  
  if (!taskProject) {
    console.error(`Project "${taskDetails.projectName}" not found.`);
    return;
  }

  taskProject.currentTasks.push(taskDetails);
  project.currentTasks.splice(project.currentTasks.indexOf(task), 1);
  
  console.log(`Task "${taskTitle}" edited successfully in project "${projectName}".`);
  localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
}







// TASK DETAILS DOM ELEMENTS
// this function creates the task details elements
function editTaskDetailsDOM(taskName) {
  console.log("editTaskDetailsDOM called");
  console.log(`taskName: ${taskName}`);
  // find the current project name of the taskName in projectTasks array
  const project = projectTasks.find((project) => {
    return project.currentTasks.find((task) => {
      console.log(`task.title: ${task.title}`);
      return task.title === taskName;
    });
  });
  // console.log(`project: ${JSON.stringify(project.projectName)}`);
  if (project && project.projectName) {
    console.log(`project.projectName: ${project.projectName}`);
  }
  
  if (!project) {
    console.error(`Project not found for task "${taskName}".`);
    return;
  }

  const taskDetailsContainer = document.createElement("ul");
  taskDetailsContainer.id = "details";

  // set data attribute for taskDetailsContainer
  taskDetailsContainer.setAttribute("data-task", taskName);

  const elements = [
    { type: "h3", text: "Project" },
    {
      type: "select",
      id: "project-selector",
      options: [
        { text: "None" },
        ...projects.map((element) => ({ text: element })),
      ],
    },
    { type: "h3", text: "Date Due" },
    { type: "input", id: "date-due", attributes: { type: "date" } },
    { type: "h3", text: "Task Priority" },
    {
      type: "select",
      id: "priority-selector",
      options: [
        { text: "None" },
        { text: "Low" },
        { text: "Medium" },
        { text: "High" },
      ],
    },
    { type: "h3", text: "Time Due" },
    { type: "input", id: "time-due", attributes: { type: "time" } },
    { type: "h3", text: "Description" },
    {
      type: "textarea",
      id: "task-description",
      attributes: { placeholder: "Enter description." },
    },
  ];

  for (const { type, text, id, options, attributes, title } of elements) {
    const element = document.createElement(type);
    if (text) {
      element.textContent = text;
    }
    if (id) {
      element.id = id;
    }
    if (options) {
      options.forEach(({ text }) => {
        const option = document.createElement("option");
        option.textContent = text;
        element.appendChild(option);
      });
    }
    if (attributes) {
      for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
      }
    }
    if (title) {
      element.title = title;
    }
    taskDetailsContainer.appendChild(element);
  }

  const detailBtnsContainer = document.createElement("div");
  detailBtnsContainer.id = "detail-btns";

  const detailBtns = [
    { type: "div", id: "save-btn", title: "Save Changes" },
    { type: "div", id: "cancel-btn", title: "Cancel Changes" },
    { type: "div", id: "delete-btn", title: "Delete Task" },
  ];

  for (const { type, id, title } of detailBtns) {
    const element = document.createElement(type);
    if (id) {
      element.id = id;
    }
    if (title) {
      element.title = title;
    }
    detailBtnsContainer.appendChild(element);
    taskDetailsContainer.appendChild(detailBtnsContainer);
  }
  
  // select the detailBtns with an id of save-btn and add an event listener to it
  // when clicked, call the editTaskDetails function
  taskDetailsContainer.querySelector("#save-btn").addEventListener("click", () => {
    // this worked
    // editTaskDetails('Finish to do app', 'Unnamed Project');
    // editTaskDetails needs to find out the task title and project name based on the task that was clicked

    // task clicked needs to be saved as a variable

    // tasks that have no project name will have the project name of 'Unnamed Project'
    // the task title is the textContent of the "div.checklist-task-item"
    // the project name is the key of the projectTasks object that the task is in
    // the task title and project name will be passed into the editTaskDetails function
    // the task title and project name will be used to find the task in the projectTasks object

    editTaskDetails(taskName, project.projectName);

    console.log(`Testing this really quick`);
  });

  const setSelectWidth = () => {
    const setWidth = (select) => {
      let maxTextLength = 0;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.length > maxTextLength) {
          maxTextLength = select.options[i].text.length;
        }
      }
      select.style.width = maxTextLength + 4 + "ch";
    };
    setWidth(taskDetailsContainer.querySelector("#project-selector"));
    setWidth(taskDetailsContainer.querySelector("#priority-selector"));
  };

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
  editTaskDetailsDOM,
  Task,
  projectSelection,
  editTaskDetails,
};
