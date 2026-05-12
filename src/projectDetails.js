import { Project } from "./projectModel.js";
import { setProjectMeta } from "./seo.js";

async function getProjects() {
  const response = await fetch("/data/projects.json");

  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  const projects = await response.json();
  return projects.map((project) => new Project(project));
}

function createListItems(items = []) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderSiteHeader() {
  return `
  <header class="site-header">
    <a class="brand" href="#home">Shaban Aly</a>

    <nav class="site-nav" aria-label="Main navigation">
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-actions">
      <button
        class="icon-button theme-toggle"
        id="theme-toggle"
        type="button"
        aria-label="Toggle theme"
      >
        <span class="theme-icons" aria-hidden="true">
          <i class="fas fa-sun sun"></i>
          <i class="fas fa-moon moon"></i>
        </span>
      </button>
      <button
        class="icon-button menu-toggle"
        type="button"
        aria-label="Toggle menu"
      >
        <i class="fas fa-bars" aria-hidden="true"></i>
      </button>
    </div>
  </header>
  `;
}

function renderSiteFooter() {
  return `
  <footer>
    <p>&copy; ${new Date().getFullYear()} Shaban Aly. All rights reserved.</p>
  </footer>
  `;
}

function renderProjectNotFound() {
  return `
    ${renderSiteHeader()}
    <main>
      <section class="project-details section">
        <a class="back-link" href="#projects">Back to Projects</a>
        <div class="text-panel">
          <p class="error-message">Project details could not be found.</p>
        </div>
      </section>
    </main>
    ${renderSiteFooter()}
  `;
}

function reserScroll() {
  window.scrollTo(0, 0, { behavior: "smooth" });
}

export function renderProjectDetails(project) {
  reserScroll();
  return `
    ${renderSiteHeader()}
    <main>
      <section class="project-details section">
        <a class="back-link" href="#projects">Back to Projects</a>

        <div class="project-details-layout">
          <div class="project-details-image">
            <img src="${project.image}" alt="${project.title}" />
          </div>

          <div class="project-details-content">
            <p class="project-category">${project.category}</p>
            <h1>${project.title}</h1>
            <p>${project.description}</p>

            <div class="project-meta">
              <span>Status: ${project.status}</span>
            </div>

            <section class="project-details-block" aria-labelledby="project-tech-title">
              <h2 id="project-tech-title">Technologies</h2>
              <ul class="technology-list">
                ${createListItems(project.technologies)}
              </ul>
            </section>

            <section class="project-details-block" aria-labelledby="project-features-title">
              <h2 id="project-features-title">Features</h2>
              <ul class="feature-list">
                ${createListItems(project.features)}
              </ul>
            </section>

            <a class="primary-link" href="${project.url}" target="_blank" rel="noreferrer">
              Visit Project
            </a>
          </div>
        </div>
      </section>
    </main>
    ${renderSiteFooter()}
  `;
}

export async function handleProjectDetailsRoute(
  appElement,
  hash = window.location.hash,
) {
  if (!appElement || !hash.startsWith("#project/")) {
    return false;
  }

  const slug = hash.replace("#project/", "");

  try {
    const projects = await getProjects();
    const project = projects.find((item) => item.slug === slug);

    if (project) {
      setProjectMeta(project);
    }

    appElement.innerHTML = project
      ? renderProjectDetails(project)
      : renderProjectNotFound();
  } catch (error) {
    appElement.innerHTML = renderProjectNotFound();
    console.error(error);
  }

  return true;
}
