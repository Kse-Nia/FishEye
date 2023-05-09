class LightboxFactory {
  constructor(data, currentMediaIndex) {
    this.data = data[currentMediaIndex];
    this.photographerId = data[currentMediaIndex].photographerId;
    this.currentMediaIndex = currentMediaIndex;
    this.id = data[currentMediaIndex].id;
    this.title = data[currentMediaIndex].title;
    this.image = data[currentMediaIndex].image;
    this.video = data[currentMediaIndex].video;

    if (this.data.video) {
      this.mediaSrc = `./assets/Media/${this.photographerId}/${this.data.video}`;
      this.mediaToCreate = document.createElement("iframe");
      this.mediaToCreate.setAttribute("title", this.title);
      this.mediaToCreate.setAttribute("controls", true);
    } else if (this.data.image) {
      this.mediaSrc = `./assets/Media/${this.photographerId}/${this.data.image}`;
      this.mediaToCreate = document.createElement("img");
    } else {
      console.error("Error, media est introuvable", this.data);
    }
  }
  createLightboxMedia() {
    const displayContainer = document.createElement("div");
    displayContainer.setAttribute("class", "lightbox-media");
    displayContainer.setAttribute("id", "lightbox_container");

    this.mediaToCreate.classList.add("lightboxMediaOpen");
    this.mediaToCreate.setAttribute("src", this.mediaSrc);
    this.mediaToCreate.setAttribute("tabindex", "0");
    this.mediaToCreate.setAttribute("alt", `media - ${this.title}`);
    this.mediaToCreate.setAttribute("id", `${this.id}`);
    displayContainer.appendChild(this.mediaToCreate);

    console.log(displayContainer);
    console.log("index", this.currentMediaIndex);
    return displayContainer;
  }
  createLightboxMediaName() {
    const mediaName = document.createElement("figcaption");
    mediaName.setAttribute("id", "lightbox_media_name");
    return mediaName;
  }
}
