let projects = JSON.parse(window.localStorage.getItem("projectnames"));

// window.localStorage.setItem("projectname", JSON.stringify(projects));
// let projectsString = window.localStorage.getItem("projectname");
// projects = JSON.parse(projectsString);


// create global reference to array
window.projects = projects;

export { projects }



// if ((window.localStorage.getItem("projectname")) != null) {
//   projects = window.localStorage.getItem("projectname")
//   console.log(`if statement section firing`);
// }

// console.log(`projects value in dataStorage: ${projects}`);

// // Object Constructor
// function Projects(name) {
//   this.name = name;
// }

// // Example Project
// const odinProject = new Projects('The Odin Project');