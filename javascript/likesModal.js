class LikesModal {
  constructor(photographer, media) {
    this.photographer = photographer;
    this.price = photographer.price;
    this.likes = media.reduce(
      (totalLikes, currentMedia) => totalLikes + currentMedia.likes,
      0
    );
  }
  createLikesModal() {
    const likesModal = document.createElement("div");
    likesModal.classList.add("likes-modal");
    likesModal.innerHTML = `
    <aside class="likes-modal-content">
    <div class="likes-modal-content-text">
      <div class="likes-container">
        <span>${this.likes}</span>
        <i class="fas fa-heart"></i>
      </div>
    </div>
    <p class="likes-modal-content-text-price">${this.price}€ / jour</p>
  </aside>  
    `;
    return likesModal;
  }
}
