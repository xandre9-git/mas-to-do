import { addProject, projects } from "./todoModule";
import { createListItem } from "./todoModule";

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

const projectsList = document.createElement('ul');
projectsList.id = "projects-ul"
const addProjectButton = document.createElement('li');
addProjectButton.className = "add-projects";
addProjectButton.textContent = "+ Add Project";




addProjectButton.addEventListener('click', function(){
  let res = addProject();
  let project = createListItem(res.projects[projects.length -1]);
  project.className = 'added-projects';
  console.log(project.textContent);
  project.id = project.textContent;
  if (project.textContent != "") {
    projectsList.prepend(project);
    console.log(res.projects);  
    return projectsList;
  }
});
projectsList.appendChild(addProjectButton);
projectsContainer.appendChild(projectsList);



body.appendChild(topBar);
topBar.appendChild(appTitle);

body.appendChild(leftSideBar);

leftSideBar.appendChild(projectsTitle);
leftSideBar.appendChild(projectsContainer);

export { body };