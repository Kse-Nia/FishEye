const urlParams = new URLSearchParams(window.location.search); // Get url parameters
const id = urlParams.get("id"); // Get photographer id
console.log(id);

// Creation elements function
function createElements(tag, attributes = {}, textContent = "") {
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

  const modalElements = [
    createElementsContent(
      "button",
      { class: "profile-contact" },
      "Contactez-moi"
    ),
  ];

  detailsElements.forEach((element) => profileDetailsDiv.appendChild(element));
  modalElements.forEach((element) => article.appendChild(element));
  elements.forEach((element) => article.appendChild(element));
  profileContainer.appendChild(article);
}

displayProfile();
