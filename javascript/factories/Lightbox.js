class Lightbox {
  constructor(media, currentIndex) {
    this.media = media;
    this.currentIndex = currentIndex || 0; // 0 if currentIndex is not provided
    this.createLightbox();
    this.updateMedia();
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
  updateMedia() {
    const mediaItem = this.media[this.currentIndex];
    console.log(mediaItem);
    const mediaContainer = this.$lightbox.querySelector(
      ".lightbox-content_media"
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

    this.$lightbox.querySelector("#lightbox_media_name").textContent =
      mediaItem.title;
  }
  open() {
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
    this.updateMedia();
  }
  showNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.media.length) {
      this.currentIndex = 0;
    }
    this.updateMedia();
  }
}

/* class Lightbox {
  constructor(media) {
    this.media = media;
    this.currentIndex = 0;
    this.title = media.title;
    this.likes = media.likes;

    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");
    this.$lightbox.style.display = "none"; // hide lightbox
    this.$lightbox.innerHTML = `
  <div class="lightbox__container" aria-hidden="true" role="dialog" >
    <span class="prev"> prev < </span>
    <span class="next"> next > </span>
    <span class="close"> Close X </span>
      <div class="lightbox__media-name">
        <h2 class="lightbox__media-name__title"></h2>
      </div>
      <div class="lightbox-content_media"></div>
  </div>
    `;
    document.body.appendChild(this.$lightbox);

    this.$prev = this.$lightbox.querySelector(".prev");
    this.$next = this.$lightbox.querySelector(".next");
    this.$close = this.$lightbox.querySelector(".close");
    this.$image = this.$lightbox.querySelector(".lightbox-image");
    this.$video = this.$lightbox.querySelector(".lightbox-video");

    this.$prev.addEventListener("click", () => this.showPrev());
    this.$next.addEventListener("click", () => this.showNext());
    this.$close.addEventListener("click", () => this.close());

    console.log("media", media);
  }

  open(index) {
    this.currentIndex = index;
    this.updateMedia();
    this.$lightbox.style.display = "flex";
  }
  close() {
    this.$lightbox.style.display = "none";
    this.$image.src = "";
    this.$video.src = "";
    console.log("close");
  }
  showPrev() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.media.length - 1;
    }
    this.updateMedia();
  }
  showNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.media.length) {
      this.currentIndex = 0;
    }
    this.updateMedia();
  }
  updateMedia() {
    const media = this.media[this.currentIndex];
    const content = this.$lightbox.querySelector(".lightbox-content_media");
    content.innerHTML = "";
    console.log(media);

    if (media instanceof MediaImage) {
      const img = document.createElement("img");
      img.src = media.image;
      img.alt = media.title;
      img.classList.add("lightbox-image");
      content.appendChild(img);

      this.title = media.title;
      this.$image.style.display = "block";
      this.$video.style.display = "none";
      console.log("image", this.$image);
      console.log(media.title);
      console.log(media instanceof MediaImage);
    } else if (media instanceof MediaVideo) {
      const video = document.createElement("video");
      video.src = media.video;
      video.alt = media.title;
      video.controls = true;
      video.classList.add("lightbox-video");
      content.appendChild(video);

      this.title = media.title;
      this.$video.style.display = "block";
      this.$image.style.display = "none";
      console.log("video", this.$video);
    }
    console.log(media);
    console.log(typeof media);
  }
} */

/* class Lightbox {
  constructor(media) {
    this.media = media;
    this.currentIndex = null;
    this.lightboxElement = document.createElement("div");
    this.lightboxElement.classList.add("lightbox");

    this.lightboxElement.addEventListener("click", (event) => {
      if (event.target.matches(".lightbox-close")) {
        this.close();
      } else if (event.target.matches(".lightbox-next")) {
        this.next();
      } else if (event.target.matches(".lightbox-prev")) {
        this.prev();
      }
    });
  }

  open(index) {
    this.currentIndex = index;
    this.updateMedia();
    document.body.appendChild(this.lightboxElement);
  }

  close() {
    document.body.removeChild(this.lightboxElement);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.media.length;
    this.updateMedia();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.media.length) % this.media.length;
    this.updateMedia();
  }

  updateMedia() {
    const currentMedia = this.media[this.currentIndex];
    console.log(currentMedia instanceof Media); // should be true
    console.log(currentMedia instanceof MediaImage); // should be true if it's an image
    console.log(currentMedia instanceof MediaVideo); // should be true if it's a video

    let mediaHtml = "";
    if (currentMedia instanceof MediaImage) {
      mediaHtml = `<img src="${currentMedia.image}" alt="${currentMedia.title}">`;
    } else if (currentMedia instanceof MediaVideo) {
      mediaHtml = `<video controls src="${currentMedia.video}"></video>`;
    } else {
      console.error("Unsupported media type:", currentMedia);
      return;
    }

    this.lightboxElement.innerHTML = `
      <div class="lightbox">
          <div class="lightbox-close">
              <button class="lightbox-close" onclick="lightbox.close()"> Close X</button>
          </div>
          <div class="lightbox-content">
              <button class="lightbox-prev" onclick="lightbox.prev()">Prev</button>
              <div class="lightbox-media">
                  ${mediaHtml}
              </div>
              <button class="lightbox-next" onclick="lightbox.next()">Next</button>
          </div>
      </div>
  `;
  }
} */
