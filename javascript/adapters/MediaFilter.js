class FilterAdapter {
  constructor(Media, photographerId) {
    this.Media = Media;
    this._photographerId = photographerId;

    this.$filterWrapper = document.querySelector(".filter_container");
    this.$wrapper = document.createElement("div");
    this.$wrapper.setAttribute("class", "filter-wrapper");
    this.$galleryWrapper = document.querySelector(".gallery_container");
  }
  get photographerId() {
    return new URLSearchParams(window.location.search).get("id");
  }
  getFilterDOM() {
    const filter = `
    <label for="sort-options">Trier par:</label>
    <select id="sort-options" class="filter-wrapper_sort">
          <option role="option" value="title">Titre</option>
          <option role="option" value="popularity">Popularité</option>
          <option role="option" value="date">Date</option>
      </select>
    `;

    this.$wrapper.innerHTML = filter;
    this.$filterWrapper.appendChild(this.$wrapper); // Append the $wrapper to the $filterWrapper

    return this.$wrapper;
  }

  filterByPopularity() {
    const mediaFiltered = this.Media.filter(
      (item) => item.photographerId == this._photographerId
    );
    const mediaSorted = mediaFiltered.sort((a, b) => b.likes - a.likes);
    this.$galleryWrapper.innerHTML = "";
    mediaSorted.forEach((item) => {
      const mediaGallery = MediaFactory.createMedia(item);
      const mediaArticleDom = mediaGallery.getGalleryDOM();
      this.$galleryWrapper.appendChild(mediaArticleDom);
    });
  }

  filterByDate() {
    const mediaFiltered = this.Media.filter(
      (item) => item.photographerId == this._photographerId
    );
    const mediaSorted = mediaFiltered.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    this.$galleryWrapper.innerHTML = "";
    mediaSorted.forEach((item) => {
      const mediaGallery = MediaFactory.createMedia(item);
      const mediaArticleDom = mediaGallery.getGalleryDOM();
      this.$galleryWrapper.appendChild(mediaArticleDom);
    });
  }

  filterByTitle() {
    const mediaFiltered = this.Media.filter(
      (item) => item.photographerId == this._photographerId
    );
    //debugger;
    console.log("Filtered Media:", mediaFiltered);

    const mediaSorted = mediaFiltered.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    this.$galleryWrapper.innerHTML = "";
    mediaSorted.forEach((item) => {
      const mediaGallery = MediaFactory.createMedia(item);
      const mediaArticleDom = mediaGallery.getGalleryDOM();
      this.$galleryWrapper.appendChild(mediaArticleDom);
    });
  }
}
