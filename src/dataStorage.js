let projects = JSON.parse(window.localStorage.getItem("projectnames"));
// let projects = [];

// create global reference to array
window.projects = projects;

export { projects };

// // Object Constructor
// function Projects(name) {
//   this.name = name;
// }

// // Example Project
// const odinProject = new Projects('The Odin Project');
