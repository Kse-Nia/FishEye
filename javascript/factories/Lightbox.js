/* eslint-disable no-unused-vars */
class Lightbox {
  constructor(media, currentIndex) {
    this.media = media;
    this.currentIndex = currentIndex === undefined ? 0 : currentIndex;
    this.createLightbox();
    this.openBoxModal();

    window.addEventListener("keydown", (e) => this.accessKey(e));
  }
  createLightbox() {
    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");

    this.$lightbox.innerHTML = `
<div class="lightbox" aria-label="image closeup view">
  <div class="lightbox-content">
  <div class="lightbox-conten-prev">
    <a>
      <img src="./assets/icons/prev.svg" alt="Previous" class="lightbox-prev"
    /></a>
    </div>
    <div class="lightbox-content-media"></div>
    <div class="lightbox_controlers">
        <button class="lightbox_button">
          <img
            src="./assets/icons/close.svg"
            alt="Close"
            class="lightbox-close"
          />
        </button>
        <a>
        <img src="./assets/icons/next.svg" alt="Next" class="lightbox-next"
      /></a>
    </div>
  </div>
</div>
`;

    document.body.appendChild(this.$lightbox);

    this.$prev = this.$lightbox.querySelector(".lightbox-prev");
    this.$next = this.$lightbox.querySelector(".lightbox-next");
    this.$prev.setAttribute("aria-label", "Previous");
    this.$next.setAttribute("aria-label", "Next");
    this.$close = this.$lightbox.querySelector(".lightbox-close");

    this.$prev.addEventListener("click", () => this.showPrev());
    this.$next.addEventListener("click", () => this.showNext());
    this.$close.addEventListener("click", () => this.close());
  }
  openBoxModal() {
    const mediaItem = this.media[this.currentIndex];
    const mediaContainer = this.$lightbox.querySelector(
      ".lightbox-content-media"
    );
    mediaContainer.innerHTML = "";

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

    const title = document.createElement("p");
    title.classList.add("lightbox__media_name");
    title.setAttribute("id", "lightbox_media_name");
    title.textContent = mediaItem.title;
    mediaContainer.appendChild(title);
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
  // Accessibilty keyboard navigation
  accessKey(e) {
    if (e.key === "Escape") {
      this.close();
    }
    if (e.key === "ArrowLeft" || e.key === 37) {
      this.showPrev();
    }
    if (e.key === "ArrowRight" || e.key === 39) {
      this.showNext();
    }
  }
}
