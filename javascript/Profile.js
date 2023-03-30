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

async function displayProfile() {
  const json = await fetch("/data/photographers.json");
  const data = await json.json();
  const photographers = data.photographers;
  const profile = photographers.find((photographer) => photographer.id == id);
  console.log(profile);

  const profileContainer = document.querySelector(".profile_container");
  const article = createElements("article", {
    class: "photographer-article",
  });

  const picture = `./assets/Photos/Portraits/${profile.portrait}`; // Photographers portraits

  const h2 = createElements("h2", { class: "photographer-name" }, profile.name);
  const img = createElements("img", {
    src: picture,
    alt: profile.name,
    class: "photographer-portrait",
  });
  createElements("p", { class: "photograph-country" }, profile.country);
  createElements("p", { class: "photograph-city" }, profile.city);
  const localisationElement = createElements("p", {
    class: "photographer-localisation",
  });
  const taglineElement = createElements(
    "p",
    {
      class: "photographer-tagline",
    },
    profile.tagline
  );

  const priceElement = createElements("p", { class: "photographer-price" });

  localisationElement.textContent = `${profile.city}, ${profile.country}`;
  priceElement.textContent = `${profile.price}€/jour`;

  const elements = [img, h2, localisationElement, taglineElement, priceElement];
  elements.forEach((elements) => article.appendChild(elements));

  return profileContainer.appendChild(article);
}

displayProfile();
