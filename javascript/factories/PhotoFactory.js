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

// Photographer factory, create DOM
class PhotographerFactory {
  constructor(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.picture = `./assets/Media/Portraits/${portrait}`;
  }
  getUsersCardDOM() {
    const article = createElements("article", {
      class: "photographer-article",
      "data-id": this.id,
    });
    const elements = [
      createElements("img", {
        src: this.picture,
        alt: this.name,
        class: "photographer-portrait",
        ariaLabel: "Photographer portrait",
      }),
      createElementsContent("h2", { class: "photographer-name" }, this.name),
      createElementsContent(
        "p",
        { class: "photographer-localisation" },
        `${this.city}, ${this.country}`
      ),
      createElementsContent(
        "p",
        { class: "photographer-tagline" },
        this.tagline
      ),
      createElementsContent(
        "p",
        { class: "photographer-price" },
        `${this.price}€/jour`
      ),
    ];
    article.addEventListener("click", () => {
      const photographId = article.dataset.id;
      window.location.href = `./photographer.html?id=${photographId}`;
      console.log(photographId);
    });
    elements.forEach((element) => article.appendChild(element));
    return article;
  }

  getProfileDOM() {
    const urlParams = new URLSearchParams(window.location.search); // Get url parameters
    const id = urlParams.get("id"); // Get photographer id

    const profileContainer = document.querySelector(".profile_container");
    const article = createElements("article", {
      class: "profile-article",
    });
    const profileDetailsDiv = createElements("div", {
      class: "profile-details",
    });

    const elements = [
      createElements("img", {
        src: this.picture,
        alt: this.name,
        class: "photographer-portrait",
        ariaLabel: "Photographer portrait",
      }),
      profileDetailsDiv,
    ];
    const modalElements = [
      createElementsContent(
        "button",
        { class: "profile-contact", type: "button" },
        "Contactez-moi"
      ),
    ];
    const detailsElements = [
      createElementsContent("h1", { class: "photographer-name" }, this.name),
      createElementsContent(
        "p",
        { class: "photographer-localisation" },
        `${this.city}, ${this.country}`
      ),
      createElementsContent(
        "p",
        { class: "photographer-tagline" },
        this.tagline
      ),
    ];
    detailsElements.forEach((element) =>
      profileDetailsDiv.appendChild(element)
    );

    modalElements.forEach((element) => article.appendChild(element));
    elements.forEach((element) => article.appendChild(element));
    profileContainer.appendChild(article);

    // Modal Form
    const form = document.querySelector("#contact-form");
    const modal = document.querySelector(".modal");
    const openContact = document.querySelector(".profile-contact");
    const closeBtn = document.querySelector(".close-btn");

    openContact.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block"; // Make sure the form is displayed
      console.log("click");
    });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "none";
      console.log("click");
    });

    return article;
  }
}
