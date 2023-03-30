class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
  get id() {
    return this._id;
  }
  get photographerId() {
    return this._photographerId;
  }
  get title() {
    return this._title;
  }
  get image() {
    return `/assets/Photos/${this._image}`;
  }
  get likes() {
    return this._likes;
  }
  get date() {
    return this._date;
  }
  get price() {
    return this._price;
  }
}
