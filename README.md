# Shaban Aly Portfolio

A personal portfolio website for showcasing projects, skills, and contact information. The project is built with plain HTML, CSS, and JavaScript, with a clean responsive layout, dark mode support, project cards loaded from JSON, and simple interactive animations.

## Features

- Responsive layout for desktop, tablet, and mobile screens
- Dark and light theme toggle with saved user preference
- Mobile navigation menu
- Animated hero section with floating technology icons
- Projects rendered dynamically from `projects.json`
- Separate pages for Home, Projects, About, and Contact
- Static website structure that can be deployed easily

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome
- JSON for project data

## Project Structure

```txt
static-html/
  index.html
  about/
    index.html
  contact/
    index.html
  projects/
    index.html
  css/
    colors.css
    index.css
    projects.css
  js/
    index.js
    theme.js
    projects.js
    projectModel.js
    animation_hero.js
  data/
    projects.json
  assets/
    Icons8/
    images/
```

## Getting Started

This is a static website, so it does not require a build step.

You can run it locally using a simple local server. For example, with VS Code you can use the Live Server extension and open:

```txt
static-html/index.html
```

Or serve the folder with any static server.

## Project Data

Projects are stored in:

```txt
static-html/data/projects.json
```

Each project includes:

- title
- category
- description
- technologies
- features
- status
- URL
- image

## Deployment

The project can be deployed on any static hosting platform, including Netlify, Vercel, GitHub Pages, or Cloudflare Pages.

For Netlify:

```txt
Base directory: static-html
Publish directory: static-html
Build command: leave empty
```

## Author

**Shaban Aly**

- Portfolio: This project
- Email: O0P4o@example.com

