// Create elements function
function createElements(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  element.textContent = textContent;
  return element;
}

// Create elements
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
    this.picture = `./assets/Photos/Portraits2/${portrait}`;
    console.log(data);
  }
  getUserCardDOM() {
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
}
const photographer = new PhotographerFactory();
const userCardDOM = photographer.getUserCardDOM();

// Profile Display
const urlParams = new URLSearchParams(window.location.search); // Get url parameters
const id = urlParams.get("id"); // Get photographer id
console.log(id);

async function displayProfile() {
  const json = await fetch("/data/photographers.json");
  const data = await json.json();
  const photographers = data.photographers;
  const profile = photographers.find((photographer) => photographer.id == id);

  const profileContainer = document.querySelector(".profile_container");
  const article = createElements("article", {
    class: "profile-article",
  });
  const picture = `./assets/Photos/Portraits2/${profile.portrait}`; // Photographers portraits
  const profileDetailsDiv = createElements("div", {
    class: "profile-details",
  });

  const elements = [
    createElements("img", {
      src: picture,
      alt: profile.name,
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
    createElementsContent("h1", { class: "photographer-name" }, profile.name),
    createElementsContent(
      "p",
      { class: "photographer-localisation" },
      `${profile.city}, ${profile.country}`
    ),
    createElementsContent(
      "p",
      { class: "photographer-tagline" },
      profile.tagline
    ),
  ];

  detailsElements.forEach((element) => profileDetailsDiv.appendChild(element));
  modalElements.forEach((element) => article.appendChild(element));
  elements.forEach((element) => article.appendChild(element));
  profileContainer.appendChild(article);

  // Display modal
  const closeBtn = document.querySelector(".close");
  const btnContact = document.querySelector(".profile-contact");
  btnContact.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  });
}

displayProfile();
