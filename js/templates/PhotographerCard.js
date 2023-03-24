class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("photographer-container");

    const photoCard = ` 
    <div class="movie-thumbnail center">
    <img
        alt="${this._photographer.portrait}"
        src="${this._photographer.thumbnail}"
    />
</div>
<h3 class="fs-16 center">${this._photographer.name}</h3>
<p class="fs-14 center">
    <span>${this._movie.released_in}</span>
    -
    <span>${this._movie.duration}</span>
</p>
    `;
  }
}
