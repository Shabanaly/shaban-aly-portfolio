export function initMenu() {
  const btnMenu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!btnMenu || !navLinks) return;

  const icon = btnMenu.querySelector("i");

  function closeMenu() {
    navLinks.classList.remove("active");
    btnMenu.classList.remove("active");
    icon?.classList.add("fa-bars");
    icon?.classList.remove("fa-xmark");
  }

  btnMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    btnMenu.classList.toggle("active");
    icon?.classList.toggle("fa-bars");
    icon?.classList.toggle("fa-xmark");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !btnMenu.contains(event.target)) {
      closeMenu();
    }
  });
}
