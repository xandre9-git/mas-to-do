// project names array
let projects = JSON.parse(window.localStorage.getItem("projectnames"));

// create global reference to array
window.projects = projects;

// task object creator

function Task(project, desc, dateDue, priority) {
  this.project = project
  this.desc = desc;
  this.dateDue = dateDue;
  this.priority = priority;
  this.commands = function commands(){
    // placeholder
  }
}

// example task

const practiceProgramming = new Task(
  "Odin",
  "Practice programming for two hours",
  new Date(2023, 1, 3)
)
console.log(`practiceProgramming: ${practiceProgramming.project} ${practiceProgramming.desc} ${practiceProgramming.dateDue}`);

// to-do array
// will store objects as items
let toDos = [];

export { projects };

// // Object Constructor
// function Projects(name) {
//   this.name = name;
// }

// // Example Project
// const odinProject = new Projects('The Odin Project');
