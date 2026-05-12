export class Project {
  constructor({
    id,
    title,
    slug,
    category,
    description,
    technologies,
    features,
    status,
    url,
    image,
  }) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.category = category;
    this.description = description;
    this.technologies = technologies;
    this.features = features;
    this.status = status;
    this.url = url;
    this.image = image;
  }

  getShortDescription() {
    return this.description.length > 130
      ? `${this.description.slice(0, 130)}...`
      : this.description;
  }
}
