class VideoPlayer {
  constructor(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
      data;
    this.id = id;
    this.photographerId = photographerId;
    this.video = video ? `./assets/Media/${photographerId}/${video}` : null;
    this.$wrapper = document.createElement("div");
    this.$modalWrapper = document.querySelector("#media");

    console.log(this);
  }
  onCloseButton() {
    this.$wrapper.querySelector(".close-btn").addEventListener("click", () => {
      this.$modalWrapper.classList.remove("modal-on");
      this.$wrapper.innerHTML = "";
    });
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
