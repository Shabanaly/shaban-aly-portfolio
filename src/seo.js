const siteName = "Shaban Aly Portfolio";
const defaultTitle = "Shaban Aly | Frontend Developer Portfolio";
const defaultDescription =
  "Frontend developer portfolio for Shaban Aly, showcasing responsive web projects, practical interfaces, and modern JavaScript experiences.";
const defaultImage = "/assets/portfolio.png";

function getAbsoluteUrl(path = "/") {
  return new URL(path, window.location.origin).href;
}

function setMetaAttribute(selector, attribute, value) {
  const element = document.head.querySelector(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

function setMetaContent(selector, content) {
  setMetaAttribute(selector, "content", content);
}

export function setPageMeta({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  url = window.location.pathname + window.location.hash,
  type = "website",
} = {}) {
  const absoluteUrl = getAbsoluteUrl(url);
  const absoluteImage = getAbsoluteUrl(image);

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[name="author"]', "Shaban Aly");
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:image"]', absoluteImage);
  setMetaContent('meta[property="og:url"]', absoluteUrl);
  setMetaContent('meta[property="og:type"]', type);
  setMetaContent('meta[property="og:site_name"]', siteName);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', absoluteImage);
  setMetaAttribute('link[rel="canonical"]', "href", absoluteUrl);
}

export function setHomeMeta() {
  setPageMeta();
}

export function setProjectMeta(project) {
  setPageMeta({
    title: `${project.title} | Project Details | Shaban Aly`,
    description: project.description,
    image: project.image,
    url: `/#project/${project.slug}`,
    type: "article",
  });
}
