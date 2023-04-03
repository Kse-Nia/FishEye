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
function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;
  const picture = `./assets/Photos/Portraits2/${portrait}`;

  function getUserCardDOM() {
    const article = createElements("article", {
      class: "photographer-article",
      "data-id": id,
    });

    const elements = [
      createElements("img", {
        src: picture,
        alt: name,
        class: "photographer-portrait",
      }),
      createElementsContent("h2", { class: "photographer-name" }, name),
      createElementsContent(
        "p",
        { class: "photographer-localisation" },
        `${city}, ${country}`
      ),
      createElementsContent("p", { class: "photographer-tagline" }, tagline),
      createElementsContent(
        "p",
        { class: "photographer-price" },
        `${price}€/jour`
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
  return { id, name, picture, city, country, tagline, price, getUserCardDOM };
}

// Profile Display
const urlParams = new URLSearchParams(window.location.search); // Get url parameters
const id = urlParams.get("id"); // Get photographer id

async function displayProfile() {
  const json = await fetch("/data/photographers.json");
  const data = await json.json();
  const photographers = data.photographers;
  const profile = photographers.find((photographer) => photographer.id == id);
  console.log(profile);

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
    }),
    profileDetailsDiv,
  ];
  const modalElements = [
    createElementsContent(
      "button",
      { class: "profile-contact" },
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
}

displayProfile();
