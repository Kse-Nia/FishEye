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
    <div class="filter-wrapper">
    <div class="dropMenu">
      <label class="dropMenu_label" for="sort-options">Trier par:</label>
      <div class="option-wrapper">
        <div class="selected-option-wrapper">
          <div class="selected-option" data-value="popularity">Popularité</div>
          <i class="fa fa-solid fa-chevron-up"></i>
        </div>
        <div class="dropMenu-options">
          <button type="button" value="popularity">Popularité</button>
          <button type="button" value="date">Date</button>
          <button type="button" value="title">Titre</button>
        </div>
      </div>
    </div>
  </div>  
  
  `;

    this.$wrapper.innerHTML = filter;
    this.$filterWrapper.appendChild(this.$wrapper);

    const selectedOption = this.$wrapper.querySelector(".selected-option");
    const buttons = this.$wrapper.querySelectorAll(".dropMenu-options button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedOption.innerHTML = button.innerHTML;
        selectedOption.setAttribute("data-value", button.value);
        this.sortList(button.value);
      });
    });

    return this.$wrapper;
  }

  sortList(sortBy) {
    const mediaFiltered = this.Media.filter(
      (item) => item.photographerId == this._photographerId
    );
    const mediaSorted = mediaFiltered.sort(this.getSortingFunction(sortBy));
    this.updateGallery(mediaSorted);
  }

  getSortingFunction(sortBy) {
    switch (sortBy) {
      case "popularity":
        return (a, b) => b.likes - a.likes;
      case "date":
        return (a, b) => new Date(b.date) - new Date(a.date);
      case "title":
        return (a, b) => a.title.localeCompare(b.title);
      default:
        return (a, b) => b.likes - a.likes;
    }
  }

  updateGallery(mediaSorted) {
    this.$galleryWrapper.innerHTML = "";
    mediaSorted.forEach((item) => {
      const mediaGallery = MediaFactory.createMedia(item);
      const mediaArticleDom = mediaGallery.getGalleryDOM();
      this.$galleryWrapper.appendChild(mediaArticleDom);
    });
  }
}
