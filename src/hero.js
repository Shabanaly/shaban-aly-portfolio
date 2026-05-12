const icons = [
  "angularjs.png",
  "javascript.png",
  "jquery.png",
  "json.png",
  "nextjs.png",
  "node.png",
  "npm.png",
  "react.png",
  "redux.png",
  "typescript.png",
  "vuejs.png",
];

export function initHero() {
  const hero = document.querySelector(".hero");
  const container = document.querySelector(".floating-icons");
  const heroImage = document.querySelector(".hero-image");
  const heroContent = document.querySelector(".hero-content");

  if (!hero || !container || !heroImage || !heroContent) return;

  function showHero() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroImage.classList.add("is-visible");
        heroContent.classList.add("is-visible");
      });
    });
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", showHero, { once: true });
  } else {
    showHero();
  }

  const floatingIcons = icons.map((iconName) => {
    const icon = document.createElement("img");
    icon.src = `/assets/IconsFrameWorkes/${iconName}`;
    icon.alt = iconName.split(".")[0];
    icon.classList.add("tech-icon");
    container.appendChild(icon);

    return {
      element: icon,
      x: Math.random() * hero.clientWidth,
      y: Math.random() * hero.clientHeight,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
    };
  });

  function animate() {
    const heroWidth = hero.clientWidth;
    const heroHeight = hero.clientHeight;

    floatingIcons.forEach((icon) => {
      const size = icon.element.offsetWidth;

      icon.x += icon.dx;
      icon.y += icon.dy;

      if (icon.x <= 0 || icon.x >= heroWidth - size) icon.dx *= -1;
      if (icon.y <= 0 || icon.y >= heroHeight - size) icon.dy *= -1;

      icon.element.style.transform = `translate(${icon.x}px, ${icon.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}
