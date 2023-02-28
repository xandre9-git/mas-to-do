// GLOBAL VARIABLES

// PROJECT LIST

// Initialize an empty array for projects
let projects = [];

// Export the projects array
export { projects };

// PROJECT TASKS

// Initialize an array for project tasks with a default object
let projectTasks = [
  {
    projectName: "Unnamed Project",
    currentTasks: [],
    completedTasks: [],
  },
];

// Export the projectTasks array
export { projectTasks };

// example project tasks object (not exported)
const exampleProjectTasks = [
  {
    projectName: "Odin",
    currentTasks: [
      {
        id: 1,
        title: "Finish To-Do Project",
        desc: "Complete To-Do Project by the end of the month and submit to Github.",
        dateDue: new Date(2023, 1, 4),
        timeDue: "",
        priority: "High",
      },
    ],
    completedTasks: [
      {
        id: "",
        title: "",
        desc: "",
        dateDue: new Date(),
        timeDue: "",
        priority: "None",
        dateCompleted: new Date(),
      },
    ],
  },
];

// [
//   {
//       "projectName": "Unnamed Project",
//       "currentTasks": [
//           {
//               "id": 1,
//               "title": "Practice coding",
//               "desc": "",
//               "dateDue": "2023-02-27T01:45:43.934Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 4,
//               "title": "Ride bike",
//               "desc": "",
//               "dateDue": "2023-02-28T01:47:19.702Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 5,
//               "title": "Train brazilian jiu jitsu",
//               "desc": "",
//               "dateDue": "2023-02-28T01:47:29.334Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 6,
//               "title": "Play final fantasy",
//               "desc": "",
//               "dateDue": "2023-02-28T01:48:09.552Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 7,
//               "title": "Spend time with natalie",
//               "desc": "",
//               "dateDue": "2023-02-28T01:48:28.594Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 8,
//               "title": "Watch the maiko house",
//               "desc": "",
//               "dateDue": "2023-02-28T01:48:36.319Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 9,
//               "title": "Listen to music",
//               "desc": "",
//               "dateDue": "2023-02-28T01:48:45.435Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 10,
//               "title": "Fix task input bar",
//               "desc": "",
//               "dateDue": "2023-02-28T01:49:03.902Z",
//               "timeDue": "",
//               "priority": "None"
//           },
//           {
//               "id": 11,
//               "title": "Test task limit",
//               "desc": "",
//               "dateDue": "2023-02-28T01:49:14.536Z",
//               "timeDue": "",
//               "priority": "None"
//           }
//       ],
//       "completedTasks": [
//           {
//               "id": 3,
//               "title": "Exercise",
//               "desc": "",
//               "dateDue": "2023-02-28T00:14:49.359Z",
//               "timeDue": "",
//               "priority": "None",
//               "DateCompleted": "2023-02-28T01:01:37.090Z"
//           },
//           {
//               "id": 2,
//               "title": "Read",
//               "desc": "",
//               "dateDue": "2023-02-28T00:14:40.398Z",
//               "timeDue": "",
//               "priority": "None",
//               "DateCompleted": "2023-02-28T01:01:38.581Z"
//           }
//       ]
//   }
// ]

// function editTaskDetails(taskElement) {
//   const taskDetailsContainer = document.createElement("ul");
//   taskDetailsContainer.id = "details";
//   // hides the task details container by default
//   // taskDetailsContainer.style.display = "none";

//   const elements = [
//     { type: "h3", text: "Project" },
//     {
//       type: "select",
//       id: "project-selector",
//       options: [
//         { text: "None" },
//         ...projects.map((element) => ({ text: element })),
//       ],
//     },
//     { type: "h3", text: "Date Due" },
//     { type: "input", attributes: { type: "date" } },
//     { type: "h3", text: "Task Priority" },
//     {
//       type: "select",
//       id: "priority-selector",
//       options: [
//         { text: "None" },
//         { text: "Low" },
//         { text: "Medium" },
//         { text: "High" },
//       ],
//     },
//     { type: "h3", text: "Time Due" },
//     { type: "input", attributes: { type: "time" } },
//     { type: "h3", text: "Description" },
//     {
//       type: "textarea",
//       id: "detail-desc",
//       attributes: { placeholder: "Enter description." },
//     },
//   ];

//   for (const { type, text, id, options, attributes, title } of elements) {
//     const element = document.createElement(type);
//     if (text) {
//       element.textContent = text;
//     }
//     if (id) {
//       element.id = id;
//     }
//     if (options) {
//       options.forEach(({ text }) => {
//         const option = document.createElement("option");
//         option.textContent = text;
//         element.appendChild(option);
//       });
//     }
//     if (attributes) {
//       for (const [attribute, value] of Object.entries(attributes)) {
//         element.setAttribute(attribute, value);
//       }
//     }
//     if (title) {
//       element.title = title;
//     }
//     taskDetailsContainer.appendChild(element);
//   }

//   const detailBtnsContainer = document.createElement("div");
//   detailBtnsContainer.id = "detail-btns";

//   const detailBtns = [
//     { type: "div", id: "save-btn", title: "Save Changes" },
//     { type: "div", id: "cancel-btn", title: "Cancel Changes" },
//     { type: "div", id: "delete-btn", title: "Delete Task" },
//   ];

//   for (const { type, id, title } of detailBtns) {
//     const element = document.createElement(type);
//     if (id) {
//       element.id = id;
//     }
//     if (title) {
//       element.title = title;
//     }
//     detailBtnsContainer.appendChild(element);
//     taskDetailsContainer.appendChild(detailBtnsContainer);
//   }

//   const setSelectWidth = () => {
//     const setWidth = (select) => {
//       let maxTextLength = 0;
//       for (let i = 0; i < select.options.length; i++) {
//         if (select.options[i].text.length > maxTextLength) {
//           maxTextLength = select.options[i].text.length;
//         }
//       }
//       select.style.width = maxTextLength + 4 + "ch";
//     };
//     setWidth(taskDetailsContainer.querySelector("#project-selector"));
//     setWidth(taskDetailsContainer.querySelector("#priority-selector"));
//   };

//   window.addEventListener("load", setSelectWidth);

//   const toggleDetails = () => {
//     if (taskDetailsContainer.style.display === "none") {
//       taskDetailsContainer.style.display = "block";
//     } else {
//       taskDetailsContainer.style.display = "none";
//     }
//   };

//   // taskElement.addEventListener("click", toggleDetails);

//   return taskDetailsContainer;
// }

// const allTasks = document.querySelectorAll(".checklist-task-item");
// let allTasksArr = Array.from(allTasks);
// allTasksArr.forEach((e, i) => {
//   e.addEventListener("click", function test() {
//     console.log(`allTasksArr[i]: ${allTasksArr[i].textContent}`);
//     // upon click of a task, open up the task details pane
//     taskDetailsContainer.style.display = "block";
//   });
// });