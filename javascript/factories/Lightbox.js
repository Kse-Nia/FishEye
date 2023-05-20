class Lightbox {
  constructor(media, currentIndex) {
    this.media = media;
    this.currentIndex = currentIndex === undefined ? 0 : currentIndex;
    this.createLightbox();
    this.openBoxModal();
    console.log("box current index", currentIndex);
  }
  createLightbox() {
    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");
    this.$lightbox.innerHTML = `
    <div class="lightbox__container" aria-label="”image" closeup view”>
    <div class="lightbox__container__media">
      <div class="lightbox__container__media__image">
        <img src="./assets/icons/prev.svg" alt="prev" class="prev" />
      </div>
      <div class="lightbox-content_media"></div>
      <div class="lightbo__container-buttons">
        <img src="./assets/icons/close.svg" alt="close" class="close" />
        <img src="./assets/icons/next.svg" alt="next" class="next" />
      </div>
    </div>
    <p class="lightbox__container__media__name" id="lightbox_media_name"></p>
  </div>
    `;

    document.body.appendChild(this.$lightbox);

    this.$prev = this.$lightbox.querySelector(".prev");
    this.$next = this.$lightbox.querySelector(".next");
    this.$close = this.$lightbox.querySelector(".close");

    this.$prev.addEventListener("click", () => this.showPrev());
    this.$next.addEventListener("click", () => this.showNext());
    this.$close.addEventListener("click", () => this.close());
  }
  openBoxModal() {
    const mediaItem = this.media[this.currentIndex];
    const mediaContainer = this.$lightbox.querySelector(
      ".lightbox-content_media"
    );
    mediaContainer.innerHTML = "";

    console.log(mediaItem);

    let mediaElement;
    if (mediaItem.video) {
      mediaElement = document.createElement("iframe");
      mediaElement.src = `./assets/Media/${mediaItem.photographerId}/${mediaItem.video}`;
      mediaElement.setAttribute("controls", true);
      mediaElement.classList.add("lightbox__video");
    } else {
      mediaElement = document.createElement("img");
      mediaElement.classList.add("lightbox__image");
      mediaElement.src = `./assets/Media/${mediaItem.photographerId}/${mediaItem.image}`;
    }
    mediaElement.classList.add("lightboxMediaOpen");
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.setAttribute("alt", `media - ${mediaItem.title}`);
    mediaContainer.appendChild(mediaElement);

    this.$lightbox.querySelector("#lightbox_media_name").textContent =
      mediaItem.title;
  }
  openBox() {
    this.$lightbox.style.display = "flex";
  }
  close() {
    this.$lightbox.style.display = "none";
  }
  showPrev() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.media.length - 1;
    }
    this.openBoxModal();
  }
  showNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.media.length) {
      this.currentIndex = 0;
    }
    this.openBoxModal();
  }
}
