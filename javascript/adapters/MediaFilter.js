class FilterAdapter {
  constructor(Media, photographerId) {
    this.Media = Media;
    this._photographerId = photographerId;

    this.$filterWrapper = document.querySelector(".filter_container");
    this.$wrapper = document.createElement("div");
    this.$wrapper.setAttribute("class", "filter-wrapper");
    this.$galleryWrapper = document.querySelector(".gallery_container");

    //console.log(this);
  }
  get photographerId() {
    return new URLSearchParams(window.location.search).get("id");
  }
  getFilterDOM() {
    const filter = `
    <label for="sort-options">Trier par:</label>
    <select id="sort-options" class="filter-wrapper_sort">
          <option role="option" value="default">Titre</option>
          <option role="option" value="popularity">Popularité</option>
          <option role="option" value="date">Date</option>
      </select>
    `;
    this.$wrapper.innerHTML = filter;
    this.$filterWrapper.appendChild(this.$wrapper); // Append the $wrapper to the $filterWrapper

    this.$wrapper.addEventListener("change", (e) => {
      if (e.target.value === "popularity") {
        this.filterByPopularity();
      } else if (e.target.value === "date") {
        this.filterByDate();
      } else {
        this.$galleryWrapper.innerHTML = "";
        this.Media.forEach((item) => {
          const mediaGallery = MediaFactory.createMedia(item);

          const mediaArticleDom = mediaGallery.getGalleryDOM();
          this.$galleryWrapper.appendChild(mediaArticleDom);
        });
      }
    });
    // return this.$filterWrapper;
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

    console.log("Media:", this.Media);
    console.log("sorter ", mediaSorted);
    console.log("Photographer id:", this._photographerId);
  }
}
