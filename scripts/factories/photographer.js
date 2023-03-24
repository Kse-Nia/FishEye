function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `./assets/Photos/Portraits/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const taglineElement = document.createElement("p");

    const countryElement = document.createElement("p");
    const cityElement = document.createElement("p");
    const localisationElement = document.createElement("p");
    const priceElement = document.createElement("p");

    img.setAttribute("src", picture);
    img.setAttribute("alt", name); // Alternative image text
    img.setAttribute("class", "photograph-portrait");

    countryElement.setAttribute("class", "photograph-country");
    taglineElement.setAttribute("class", "photograph-tagline");
    priceElement.setAttribute("class", "photograph-price");

    h2.textContent = name;
    taglineElement.textContent = tagline;
    countryElement.textContent = country;
    cityElement.textContent = city;

    localisationElement.textContent = `${city}, ${country}`;

    priceElement.textContent = `${price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(localisationElement);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }

  return { name, picture, city, country, tagline, price, getUserCardDOM };
}
