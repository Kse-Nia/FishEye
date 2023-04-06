// Create DOM elements
function createElements(tag, attributes = {}, textContent = "") {
  // Create tag element + add attributes
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  element.textContent = textContent;
  return element;
}

function createElementsContent(tag, attributes, content) {
  const element = createElements(tag, attributes);
  element.textContent = content;
  return element;
}

class Media {
  constructor(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
      data;
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    //this.image = image;
    this.image = `./assets/Media/${photographerId}/${image}`;
    this.video = video;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }
  getGalleryDOM() {
    const galleryContainer = createElements("div", {
      class: "gallery_container",
      "data-id": this.id,
    });
    const article = createElements("article", {
      class: "gallery-article",
    });
    const containerDescription = createElements("div", {
      class: "gallery-article_description",
    });
    const elements = [
      createElements("img", {
        src: this.image,
        alt: this.name,
        class: "gallery-article_picture",
        ariaLabel: "Photo",
      }),
    ];
    const elementsDescription = [
      createElementsContent(
        "h3",
        { class: "gallery-article_title" },
        this.title
      ),
      createElementsContent(
        "p",
        { class: "gallery-article_likes" },
        this.likes
      ),
    ];
    elements.forEach((element) => article.appendChild(element));
    elementsDescription.forEach((element) =>
      containerDescription.appendChild(element)
    );
    article.appendChild(containerDescription);
    galleryContainer.appendChild(article);
    return galleryContainer;
  }
}
