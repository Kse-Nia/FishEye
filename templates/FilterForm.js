/* class FilterForm {
  constructor(Medias) {
    this.Medias = Medias;

    this.$wrapper = document.createElement("div");
    this.$filterFormWrapper = document.querySelector(".filter-form-wrapper");
    this.$moviesWrapper = document.querySelector(".medias-wrapper");
  }

  async filterMedia(photo) {
    this.clearMoviesWrapper();

    const FilterLib = new FilterV1(this.Movies, actor);
    const FilteredMovies = await FilterLib.filterByActor();

    FilteredMovies.forEach((Photo) => {
      const Template = new PhotoCard(Movie);
      this.$moviesWrapper.appendChild(Template.createMovieCard());
    });
  }

  onChangeFilter() {
    this.$wrapper.querySelector("form").addEventListener("change", (e) => {
      const actor = e.target.value;
      this.filterMovies(actor);
    });
  }

  clearMediasWrapper() {
    this.$mediasWrapper.innerHTML = "";
  }

  render() {
    const filterForm = `
            <form class="filter-form" action="#" method="POST">
                <label for="filter-select">Trier par : </label>
                <select name="filter-select" id="filter-select">
                    <option value="popularité">Popularité</option>
                    <option value="date">Date</option>
                    <option value="titre">Titre</option>
                </select>
            </form>
        `;

    this.$wrapper.innerHTML = filterForm;
    this.onChangeFilter();

    this.$filterFormWrapper.appendChild(this.$wrapper);
  }
}
 */
