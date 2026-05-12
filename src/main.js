import "./styles/main.css";
import "./styles/projectDetails.css";
import { initTheme } from "./theme.js";
import { initMenu } from "./menu.js";
import { initHero } from "./hero.js";
import { renderProjects } from "./projects.js";
import createSocialLinks from "./socialLinks.js";
import { handleProjectDetailsRoute } from "./projectDetails.js";
import { setHomeMeta } from "./seo.js";

const app = document.querySelector("#app");

function renderHomePage() {
  setHomeMeta();

  app.innerHTML = `
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

  <main>
    <section class="hero section" id="home">
      <div class="floating-icons" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <p class="eyebrow">Frontend Developer</p>
          <h1>Welcome to My Portfolio</h1>
          <p>
            Hi, I'm <span>Shaban Aly</span>, a web developer focused on building
            responsive, clean, and practical web experiences.
          </p>
          <a class="primary-link" href="#projects">View Projects</a>
        </div>

        <div class="hero-image">
          <img src="/assets/images/me/me.png" alt="Shaban Aly" />
        </div>
      </div>
    </section>

    <section class="projects section" id="projects">
      <div class="section-header">
        <p class="eyebrow">Selected Work</p>
        <h2>Projects</h2>
      </div>
      <div class="project-grid" aria-live="polite"></div>
    </section>

    <section class="about section" id="about">
      <div class="section-header">
        <p class="eyebrow">About</p>
        <h2>About Me</h2>
      </div>
      <div class="text-panel">
        <p>
          I am a motivated software developer with a strong passion for creating
          user-friendly web applications. I enjoy working with modern frontend
          tools, improving interfaces, and turning ideas into practical products
          that feel simple to use.
        </p>
      </div>
    </section>

    <section class="contact section" id="contact">
      <div class="section-header">
        <p class="eyebrow">Contact</p>
        <h2>Get In Touch</h2>
      </div>
      <div class="contact-list"></div>
    </section>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Shaban Aly. All rights reserved.</p>
  </footer>
`;

  initTheme();
  initMenu();
  initHero();
  renderProjects();
  createSocialLinks();
}

async function handleRoute() {
  const isProjectDetailsPage = await handleProjectDetailsRoute(app);

  if (isProjectDetailsPage) {
    initTheme();
    initMenu();
    return;
  }

  renderHomePage();

  if (window.location.hash) {
    requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }
}

window.addEventListener("hashchange", handleRoute);
handleRoute();
