class LikesModal {
  constructor(photographer, media) {
    this.photographer = photographer;
    this.price = photographer.price;
    this.likesListen();
    this.likes = media.reduce(
      (totalLikes, currentMedia) => totalLikes + currentMedia.likes,
      0
    );
  }
  // eventListener for likes
  likesListen() {
    window.addEventListener("like", () => {
      this.likes++;
      this.updateLikesModal();
    });
  }
  // Update display of likes
  updateLikesModal = () => {
    const likesModal = document.querySelector(".likes-modal");
    likesModal.querySelector(".likes-container span").textContent = this.likes;
  };
  createLikesModal() {
    const likesModal = document.createElement("div");
    likesModal.classList.add("likes-modal");
    likesModal.innerHTML = `
  <aside class="likes-modal-content">
    <div class="likes-modal-content-text">
      <div class="likes-container">
        <span>${this.likes}</span>
          <i class="fas fa-heart" aria-hidden="true"></i>
      </div>
    </div>
    <p class="likes-modal-content-text-price" aria-label="Photographer rate">
      ${this.price}€ / jour
    </p>
  </aside>
  
    `;
    return likesModal;
  }
}
