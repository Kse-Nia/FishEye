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
    const article = document.createElement("article");
    article.classList.add("photographer-article");
    article.dataset.id = this.id;
    article.tabIndex = 0;

    const img = document.createElement("img");
    img.src = this.picture;
    img.alt = this.name;
    img.setAttribute("loading", "lazy");
    img.classList.add("photographer-portrait");
    img.setAttribute("aria-label", "Photographer portrait");

    const h2 = document.createElement("h2");
    h2.classList.add("photographer-name");
    h2.textContent = this.name;

    const p1 = document.createElement("p");
    p1.classList.add("photographer-localisation");
    p1.textContent = `${this.city}, ${this.country}`;

    const p2 = document.createElement("p");
    p2.classList.add("photographer-tagline");
    p2.textContent = this.tagline;

    const p3 = document.createElement("p");
    p3.classList.add("photographer-price");
    p3.textContent = `${this.price}€/jour`;
    article.append(img, h2, p1, p2, p3);

    article.addEventListener("click", () => {
      const photographId = article.dataset.id;
      window.location.href = `./photographer.html?id=${photographId}`;
      console.log(photographId);
    });
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const photographId = article.dataset.id;
        window.location.href = `./photographer.html?id=${photographId}`;
      }
    });
    return article;
  }

  getProfileDOM() {
    const profileContainer = document.querySelector(".profile_container");

    const article = document.createElement("article");
    article.classList.add("profile-article");

    const profileDetailsDiv = document.createElement("div");
    profileDetailsDiv.classList.add("profile-details");

    const img = document.createElement("img");
    img.src = this.picture;
    img.alt = this.name;
    img.classList.add("photographer-portrait");
    img.setAttribute("aria-label", "Photographer portrait");

    const h1 = document.createElement("h1");
    h1.classList.add("photographer-name");
    h1.textContent = this.name;

    const p1 = document.createElement("p");
    p1.classList.add("photographer-localisation");
    p1.textContent = `${this.city}, ${this.country}`;

    const p2 = document.createElement("p");
    p2.classList.add("photographer-tagline");
    p2.textContent = this.tagline;

    const button = document.createElement("button");
    button.classList.add("profile-contact");
    button.type = "button";
    button.textContent = "Contactez-moi";

    profileDetailsDiv.append(h1, p1, p2);
    article.append(img, profileDetailsDiv, button);

    profileContainer.appendChild(article);

    // Contact form
    const openContact = document.querySelector(".profile-contact");
    const profileName = this.name;
    const _ = new ContactForm(openContact, profileName);

    return article;
  }
}
