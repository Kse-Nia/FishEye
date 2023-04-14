class Media {
  constructor(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
      data;
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image ? `./assets/Media/${photographerId}/${image}` : null;
    this.video = video ? `./assets/Media/${photographerId}/${video}` : null;
    this.likes = likes;
    this.date = date;
    this.price = price;

    this.$icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;
    this.$galleryContainer = document.createElement("div");
    this.$article = document.createElement("article");
    this.$modalWrapper = document.createElement("div");

    this.$galleryContainer.setAttribute("class", "gallery_container");
    this.$galleryContainer.setAttribute("data-id", this.id);
    this.$article.setAttribute("class", "gallery-article");
    this.$modalWrapper.setAttribute("class", "modal-wrapper");
  }

  getGalleryDOM() {
    let card = document.createElement("div");
    let description = document.createElement("div");
    let title = document.createElement("h2");
    let likesContainer = document.createElement("div");
    let likes = document.createElement("p");
    let icon = document.createElement("i");

    if (this.video) {
      let video = document.createElement("video");
      video.setAttribute("class", "article_player");
      video.setAttribute("src", this.video);
      video.setAttribute("height", "300");
      video.setAttribute("width", "300");
      video.controls = true;
      video.muted = true;
      card.appendChild(video);
    } else if (this.image) {
      let picture = document.createElement("img");
      picture.setAttribute("class", "gallery-article_picture");
      picture.setAttribute("aria-label", "Photo");
      picture.setAttribute("src", this.image);
      card.appendChild(picture);
    }

    card.setAttribute("class", "article");
    description.setAttribute("class", "gallery-article_description");
    title.setAttribute("class", "gallery-article_title");

    likesContainer.setAttribute("class", "gallery-article_likescontainer");
    likes.setAttribute("class", "gallery-article_likes");
    icon.setAttribute("class", "fa-solid fa-heart");

    title.textContent = this.title;
    likes.textContent = this.likes;

    description.appendChild(title);
    description.appendChild(likesContainer);
    likesContainer.appendChild(likes);
    likesContainer.appendChild(icon);

    card.appendChild(description);

    this.$article.appendChild(card);
    return this.$article;
  }

  createMediaModal() {
    this.$modalWrapper.addEventListener("click", () => {
      this.$modalWrapper.classList.remove("modal-on");
      this.$modalWrapper.innerHTML = "";
    });
  }

  onClick() {
    this.$modalWrapper.classList.add("modal-on");
    this.$modalWrapper.appendChild(this.$wrapper);
  }

  lightbox() {
    const lightbox = `<div class="lightbox">
    <button class="lightbox__close">Fermer</button>
    <button class="lightbox__next">Suivant</button>
    <button class="lightbox__prev">Précédent</button>
    <div class="lightbox__container">
      <img src="chemin/vers/image.jpg" alt="">
    </div>
  </div>`;
    const boxContainer = document.createElement("div");
    boxContainer.setAttribute("class", "lightbox__container");
    boxContainer.innerHTML = lightbox;
    document.body.appendChild(boxContainer);

    this.$article.addEventListener("click", (e) => {
      e.preventDefault();
      boxContainer.style.display = "none";
      console.log("click");
    });

    boxContainer
      .querySelector(".lightbox__close")
      .addEventListener("click", () => {
        boxContainer.classList.remove("lightbox__container");
        boxContainer.innerHTML = "";
      });
  }
}
