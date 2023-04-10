class VideoPlayer {
  constructor(photographerId, video) {
    this.photographerId = photographerId;
    this.video = `./assets/Media/${photographerId}/${video}`;
    this.$wrapper = document.querySelector(".gallery-article");
  }
  onClose() {
    this.$wrapper.querySelector;
  }
  createPlayer() {
    const player = `
        <div class="player">
            <iframe 
                height="600" 
                width="800" 
                src=${this.video}
            ></iframe>
            <button class="close-btn">Fermer<button>
        </div>
    `;

    this.$wrapper.innerHTML = player;
    this.$modalWrapper.classList.add("modal-on");
    this.$modalWrapper.appendChild(this.$wrapper);

    this.onClose();
  }
  render() {
    this.createPlayer();
  }
}
