import { addTask } from "./todoModule";
import { createListItem } from "./todoModule";

// project names array
let projects = JSON.parse(window.localStorage.getItem("projectnames"));

// create global reference to array
window.projects = projects;

// task object creator

function Task(title, desc, dateDue, priority, project) {
  this.title = title;
  this.desc = desc;
  this.dateDue = dateDue;
  this.priority = priority;
  this.project = project;
  this.commands = function commands(){
    console.log(`Title: ${this.title}\nDescription: ${this.desc}\nDate Due: ${this.dateDue}\nPriority: ${this.priority}\nProject: ${this.project}`);
  }
}

// example task

const practiceProgramming = new Task(
  "Practice programming",
  "Reinforce prior learned material and learn more new concepts",
  new Date(2023, 1, 4),
  "High",
  "Odin"
)
console.log(`${practiceProgramming.commands()}`);

// let variable = addTask();
// console.log(`This shows: ${variable}`);

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
