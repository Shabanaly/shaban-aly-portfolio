export function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const theme = savedTheme || systemTheme;

  document.documentElement.setAttribute("data-theme", theme);

  const themeToggle = document.getElementById("theme-toggle");

  themeToggle?.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}
