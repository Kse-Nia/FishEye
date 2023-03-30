// Creation elements function
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

// Photographer factory, create DOM elements
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
      /*  createElementsContent("p", { class: "photograph-country" }, country),
      createElementsContent("p", { class: "photograph-city" }, city), */
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
    elements.forEach((element) => article.appendChild(element));

    article.addEventListener("click", () => {
      const photographId = article.dataset.id;
      console.log(photographId);
      window.location.href = `./photographer.html?id=${photographId}`;
    });
    return article;
  }

  return { id, name, picture, city, country, tagline, price, getUserCardDOM };
}
