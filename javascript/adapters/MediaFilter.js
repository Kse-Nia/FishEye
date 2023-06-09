class FilterAdapter {
  constructor(Media, photographerId, openLightbox) {
    this.Media = Media;
    this._photographerId = photographerId;
    this.openLightbox = openLightbox;
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
    <div class="dropMenu">
        <button id="sort-options" class="dropMenu_label" aria-haspopup="true">Trier par:</button>
        <div class="option-wrapper" aria-labelledby="sort-options">
        <div class="selected-option-wrapper">
            <div class="selected-option" data-value="popularity" tabindex="0">Popularité</div>
            <i class="fa fa-solid fa-chevron-up"></i>
        </div>
        <div class="dropMenu-options">
            <button type="button" role="button" value="popularity" tabindex="0">Popularité</button>
            <button type="button" value="date" tabindex="0">Date</button>
            <button type="button" value="title" tabindex="0">Titre</button>
        </div>
      </div>
    </div>
  `;

    this.$wrapper.innerHTML = filter;
    this.$filterWrapper.appendChild(this.$wrapper);

    const selectedOption = this.$wrapper.querySelector(".selected-option");
    const buttons = this.$wrapper.querySelectorAll(".dropMenu-options button");

    // Accessibility menu navigation
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedOption.innerHTML = button.innerHTML;
        selectedOption.setAttribute("data-value", button.value);
        this.sortList(button.value);
      });

      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          selectedOption.innerHTML = button.innerHTML;
          selectedOption.setAttribute("data-value", button.value);
          this.sortList(button.value);
        }
      });
    });
    const dropMenu = this.$wrapper.querySelector(".dropMenu");
    const optionWrapper = this.$wrapper.querySelector(".option-wrapper");

    dropMenu.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        optionWrapper.style.display = "block";
      } else if (event.key === "Escape") {
        optionWrapper.style.display = "none";
      }
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
    mediaSorted.forEach((item, index) => {
      const mediaGallery = MediaFactory.createMedia(item);
      const mediaArticleDom = mediaGallery.getGalleryDOM();

      mediaArticleDom.setAttribute("data-index", index);
      mediaArticleDom.addEventListener("click", () => {
        this.openLightbox(mediaSorted, index);
      });

      this.$galleryWrapper.appendChild(mediaArticleDom);
    });
  }
}
