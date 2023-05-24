/* class Lightbox {
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
    //     this.$lightbox.innerHTML = `
    <div class="lightbox__container" aria-label="image closeup view">
    <div class="lightbox__container__media">
      <div class="lightbox__container__media__image">
        <img src="./assets/icons/prev.svg" alt="prev" class="prev">
      </div>
      <div class="lightbox-content_media">
        <img class="lightbox__image lightboxMediaOpen" src="./assets/Media/930/Sport_Next_Hold.jpg" tabindex="0" alt="media - Climber">
      </div>
      <div class="lightbox__container__buttons">
        <img src="./assets/icons/close.svg" alt="close" class="close">
        <img src="./assets/icons/next.svg" alt="next" class="next">
      </div>
    </div>
    <p class="lightbox__container__media_name" id="lightbox_media_name">Climber</p>
  </div>
    `; //

    this.$lightbox.innerHTML = `
    <div class= "lightbox__container lightbox" aria-label="image closeup view">
    <div class="lightbox-content">
      <div class="lightbox-content-media"> </div>
      <div class="lightbox-controls">
      <img src="./assets/icons/prev.svg" alt="Previous" class="lightbox-prev" />
        <img src="./assets/icons/next.svg" alt="Next" class="lightbox-next" />
        <img src="./assets/icons/close.svg" alt="Close" class="lightbox-close" />
      </div>
    </div>
  </div>
  `;
    document.body.appendChild(this.$lightbox);

    this.$prev = this.$lightbox.querySelector(".prev");
    this.$next = this.$lightbox.querySelector(".next");
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

    const title = mediaElement.createElement("p");
    title.classList.add("lightbox__container__media_name");
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
}
 */

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

    /*     this.$lightbox.innerHTML = `
  <div class= "lightbox" aria-label="image closeup view">
  <div class="lightbox-content">
    <div class="lightbox-content-media"> </div>
    <div class="lightbox-controls">
      <img src="./assets/icons/prev.svg" alt="Previous" class="lightbox-prev" />
      <img src="./assets/icons/next.svg" alt="Next" class="lightbox-next" />
      <img src="./assets/icons/close.svg" alt="Close" class="lightbox-close" />
    </div>
  </div>
</div>
`; */
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
        <button>
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

    const title = document.createElement("p"); // updated from mediaElement.createElement to document.createElement
    title.classList.add("lightbox__container__media_name");
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
}
