// This is for the DOM

const body = document.getElementById("content");

const topBar = document.createElement('div');
topBar.id = "top-bar"

const appTitle = document.createElement('h1');
appTitle.textContent = "Mas To Do";
appTitle.className = "title";

const leftSideBar = document.createElement('div');
leftSideBar.id = "left-side-bar";

const projectsTitle = document.createElement('div');
projectsTitle.id = "projects-title"
projectsTitle.textContent = "Projects"

const projectsContainer = document.createElement('div');
projectsContainer.id = "projects-container";

const projectLists = document.createElement('ul');
const addProjectButton = document.createElement('li');
addProjectButton.id = "add-project";
addProjectButton.textContent = "+ Add Project";
projectLists.appendChild(addProjectButton);
projectsContainer.appendChild(projectLists);



body.appendChild(topBar);
topBar.appendChild(appTitle);

body.appendChild(leftSideBar);

leftSideBar.appendChild(projectsTitle);
leftSideBar.appendChild(projectsContainer);

export { body };