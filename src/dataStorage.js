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
    projectName: "My Tasks",
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
