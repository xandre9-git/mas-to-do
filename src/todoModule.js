// TO DO MODULES

import { projects } from "./dataStorage";
import { projectTasks } from "./dataStorage";
import { projectsList } from "./pageLayout";
import format from "date-fns/format";

// this function gets project name and stores as a string
function addProject() {
  return prompt("Enter name of project:");
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

// this function ties it all together
function DOMProjectAdder() {
  let res = addProject();
  if (res != null && !projects.includes(res)) {
    projects.push(res);
    window.localStorage.setItem("projectnames", JSON.stringify(projects));
    projectListSetter(res, projectsList);
    console.log(`res value: ${res}`);
    window.localStorage.setItem("projectname", res);
  }
  return projectListSetter;
}

// delete project function
function deleteProject(projectname, arr) {
  const projectIndex = arr.indexOf(projectname);
  arr.splice(projectIndex, 1);
  location.reload();
  return arr;
}

// to do boards

// current to-do's
function addTask(desc, isCompleted) {
  if (!desc) return; // check for falsy values

  const taskContainer = createTaskContainer(desc); // extract function
  taskContainer.classList.add("checklist-task-item"); // add class to task container
  const taskCheckBox = createCheckbox();
  taskCheckBox.className = "task-checkbox";
  taskCheckBox.checked = isCompleted; // set checkbox to check if task is completed
  taskCheckBox.addEventListener("change", function () {
    if (this.checked) {
      completeTask.bind(this)(); // call completeTask after binding this
    } else {
      unCompleteTask.bind(this)(); // call unCompleteTask after binding this
    }
  }); // add event listener to checkbox
  taskContainer.appendChild(taskCheckBox); // insert checkbox after task container

  if (isCompleted) {
    taskContainer.classList.add("completed");
    taskContainer.style.textDecoration = "line-through";
  }

  return taskContainer;
}

function createTaskContainer(desc) {
  const taskContainer = document.createElement("div");
  taskContainer.className = "task";
  const taskDesc = document.createElement("div");
  taskDesc.className = "checklist-task-item";
  taskDesc.textContent = desc;
  taskDesc.contentEditable = true;
  taskContainer.appendChild(taskDesc);
  return taskContainer;
}

function completeTask() {
  // Get the description of the task that was just checked
  let taskDescription = this.parentNode.querySelector(".checklist-task-item");

  // If the checkbox is checked:
  if (this.checked) {
    // Add a line through the task description to indicate that it's been completed
    taskDescription.style.setProperty("text-decoration", "line-through");

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

function unCompleteTask() {
  // Get the description of the task that was just unchecked
  let text = this.parentNode.querySelector(".checklist-task-item");

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

function createCheckbox() {
  const checkbox = document.createElement("input"); // rename variable
  checkbox.type = "checkbox";
  return checkbox;
}

// task object creator
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

function TaskDetails(id, project, dateDue, timeDue, priority, desc) {
  this.id = id;
  this.project = project;
  this.dateDue = dateDue;
  this.timeDue = timeDue;
  this.priority = priority;
  this.desc = desc;
}

// edit task details

function editTaskDetails() {
  const taskDetailsContainer = document.createElement("ul");
  taskDetailsContainer.id = "details";

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
    { type: "input", attributes: { type: "date" } },
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
    { type: "input", attributes: { type: "time" } },
    { type: "h3", text: "Description" },
    {
      type: "textarea",
      id: "detail-desc",
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
  editTaskDetails,
  Task,
};
