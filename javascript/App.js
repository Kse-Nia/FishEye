async function getPhotographers() {
  try {
    const response = await fetch("/data/photographers.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(
    ".photographer_container"
  );
  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer);
    const userCardDOM = photographerModel.getUsersCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Profile
async function displayProfile(id) {
  const response = await fetch("/data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const profile = photographers.find((photographer) => photographer.id == id);
  const photographerProfile = new PhotographerFactory(profile);
  const profileDOM = photographerProfile.getProfileDOM();
  const profileContainer = document.querySelector(".profile_container");
  profileContainer.appendChild(profileDOM);
}

// Galery
function displayGallery(media) {
  const main = document.querySelector("#main");
  const id = new URLSearchParams(window.location.search).get("id"); // Photographer Id
  const galleryContainer = document.createElement("section");
  galleryContainer.classList.add("gallery_container");

  const filteredMedia = media.filter((item) => item.photographerId == id); // Filter media by photographerId

  filteredMedia.forEach((item, index) => {
    const mediaGallery = MediaFactory.createMedia(item);
    const mediaArticleDom = mediaGallery.getGalleryDOM(galleryContainer);
    mediaArticleDom.setAttribute("data-index", index);

    galleryContainer.appendChild(mediaArticleDom);
    const mediaElement = mediaArticleDom.querySelector(
      ".gallery-article_picture.media.media-item, .article_player.media"
    );
    mediaElement.addEventListener("click", function () {
      openLightbox(filteredMedia, index);
    });

    // Accessibility
    mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        if (document.activeElement === mediaElement) {
          openLightbox(filteredMedia, index);
        }
      }
    });
  });

  main.appendChild(galleryContainer);
}

function openLightbox(media, currentMediaIndex) {
  const lightbox = new Lightbox(media, currentMediaIndex);
  lightbox.openBox();
}

async function init() {
  const { photographers, media } = await getPhotographers();
  const id = new URLSearchParams(window.location.search).get("id");
  if (id) {
    displayProfile(id);
  } else if (photographers) {
    displayData(photographers);
  }
  if (media) {
    displayGallery(media);
    const filterContainer = document.querySelector(".filter_container");
    if (filterContainer) {
      const filterAdapter = new FilterAdapter(media, id, openLightbox);
      const filterDOM = filterAdapter.getFilterDOM();
      filterContainer.appendChild(filterDOM);
    }

    // Likes Modal only if photographer profile
    if (id && photographers) {
      const photographer = photographers.find((p) => p.id == id);
      if (photographer) {
        const likesModalInstance = new LikesModal(
          photographer,
          media.filter((m) => m.photographerId == id)
        );
        const likesModal = likesModalInstance.createLikesModal();
        document.body.appendChild(likesModal);
      }
    }
  }
}

init();
