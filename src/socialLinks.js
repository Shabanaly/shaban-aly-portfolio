import { socialLinks } from "./constants/links.js";

export default function createSocialLinks() {
  socialLinks.forEach((link) => {
    const a = document.createElement("a");
    const contactList = document.querySelector(".contact-list");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", link.name);
    a.innerHTML = `<i class="${link.icon}"></i>`;
    contactList.appendChild(a);
  });
}

