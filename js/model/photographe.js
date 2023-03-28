class Photographe {
  constructor(name, id, city, country, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get city() {
    return this._city;
  }
  get country() {
    return this._country;
  }
  get tagline() {
    return this._tagline;
  }
  get price() {
    return this._price;
  }
  get portrait() {
    return this._portrait;
  }
}
