class Media {
  constructor(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
      data;
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image;
    this.video = video;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  getGalleryDOM() {
    const galleryContainer = Object.assign(document.createElement("div"), {
      className: "gallery_container",
      "data-id": this.id,
    });
    console.log(this.id);

    const cardMedia = Object.assign(document.createElement("div"), {
      className: "gallery_card",
    });
  }
}
