// This is for the DOM

const body = document.getElementById("content");

const appBanner = document.createElement('div');
appBanner.id = "top-banner"
appBanner.style.height = "50px";
appBanner.style.width = "100%";
appBanner.style.backgroundColor = "gold";

const appTitle = document.createElement('h1');
appTitle.textContent = "Mas To Do";
appTitle.className = "title";


body.appendChild(appBanner);
appBanner.appendChild(appTitle);

export { body };