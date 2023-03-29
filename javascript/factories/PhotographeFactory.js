//import Photographe from "./model/Photographe.js";

// Creation elements function
function createElements(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  element.textContent = textContent;

  return element;
}

function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;
  const picture = `./assets/Photos/Portraits/${portrait}`; // Photographers portraits

  function getUserCardDOM() {
    const article = createElements("article", {
      class: "photographer-article",
    });
    const h2 = createElements("h2", { class: "photographer-name" }, name);
    const img = createElements("img", {
      src: picture,
      alt: name,
      class: "photographer-portrait",
    });
    const countryElement = createElements(
      "p",
      { class: "photograph-country" },
      country
    );
    const cityElement = createElements("p", { class: "photograph-city" }, city);
    const localisationElement = createElements("p", {
      class: "photographer-localisation",
    });
    const taglineElement = createElements(
      "p",
      {
        class: "photographer-tagline",
      },
      tagline
    );

    const priceElement = createElements("p", { class: "photographer-price" });

    localisationElement.textContent = `${city}, ${country}`;
    priceElement.textContent = `${price}€/jour`;

    const elements = [
      img,
      h2,
      localisationElement,
      taglineElement,
      priceElement,
    ];
    elements.forEach((elements) => article.appendChild(elements));

    // Add event listener to redirect to photographer profile page
    /*   article.addEventListener("click", () => {
      window.location.href = `/photographer.html?id=${id}`;
    }); */

    return article;
  }

  return { name, picture, city, country, tagline, price, getUserCardDOM };
}
