class DropFilter {
  constructor(Media) {
    this.Media = Media;

    this.$wrapper = document.createElement("div");
    this.ProxyRatingSorter = new ProxyRatingSorter();
  }

  async filterMedia() {
    let select = document.querySelector("myList");
    const list = document.querySelector("myList");
    let option = select.options[select.selectedIndex].value;
  }

  render() {
    const dropList = `
    <div class="dropdown">
      <b> Trier par: </b>
      <select id="myList" onchange="favTutorial()">
        <option value="popularité">Popularité</option>
        <option value="date">Date</option>
        <option value="titre">Titre</option>
      </select>
      </div>  
  `;
    this.$wrapper.innerHTML = dropList;
    return this.$wrapper;
  }
}
