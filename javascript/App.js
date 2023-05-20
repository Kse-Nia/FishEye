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
  const photographerProfile = new PhotographerFactory(profile); // Use the same class
  const profileDOM = photographerProfile.getProfileDOM(); // Call the getProfileDOM() method
  const profileContainer = document.querySelector(".profile_container");
  profileContainer.appendChild(profileDOM);
}

// Galery
function displayGallery(media) {
  const main = document.querySelector("#main");
  const id = new URLSearchParams(window.location.search).get("id"); // Photographer Id
  const galleryContainer = document.createElement("div");
  galleryContainer.classList.add("gallery_container");

  const filteredMedia = media.filter((item) => item.photographerId == id); // Filter media by photographerId

  filteredMedia.forEach((item, index) => {
    const mediaGallery = MediaFactory.createMedia(item);
    const mediaArticleDom = mediaGallery.getGalleryDOM(galleryContainer);
    mediaArticleDom.setAttribute("data-index", index);

    galleryContainer.appendChild(mediaArticleDom);
    mediaArticleDom.addEventListener("click", () => {
      openLightbox(filteredMedia, index); // pass filteredMedia instead of media
    });
  });

  main.appendChild(galleryContainer);
}

function openLightbox(media, currentMediaIndex) {
  const lightbox = new Lightbox(media);
  lightbox.currentIndex = currentMediaIndex; // Clicked index Media
  lightbox.open();
  console.log(currentMediaIndex);
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
    const filterAdapter = new FilterAdapter(media, id);
    const filterDOM = filterAdapter.getFilterDOM();
    document.querySelector(".filter_container").appendChild(filterDOM);
  }
}

init();
