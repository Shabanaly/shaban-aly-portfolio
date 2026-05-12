import { Project } from "./projectModel.js";

async function getProjects() {
  const response = await fetch("/data/projects.json");

  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  const projects = await response.json();
  return projects.map((project) => new Project(project));
}

function renderProjectCard(project) {
  return `
    <article class="project-card">
      <div class="card-image">
        <img src="${project.image}" alt="${project.title}" />
      </div>
      <div class="card-content">
        <div>
          <p class="project-category">${project.category}</p>
          <h3>${project.title}</h3>
        </div>
        <p>${project.getShortDescription()}</p>
        <ul class="technology-list">
          ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
        </ul>
        <a href="#project/${project.slug}">
          View Details
        </a>
      </div>
    </article>
  `;
}

export async function renderProjects() {
  const projectsContainer = document.querySelector(".project-grid");

  if (!projectsContainer) return;

  try {
    const projects = await getProjects();
    projectsContainer.innerHTML = projects.map(renderProjectCard).join("");
  } catch (error) {
    projectsContainer.innerHTML = `<p class="error-message">Projects could not be loaded.</p>`;
    console.error(error);
  }
}
