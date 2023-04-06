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
async function displayGallery(media) {
  const response = await fetch("/data/photographers.json");
  const data = await response.json();
}
async function init() {
  const { photographers } = await getPhotographers();
  const id = new URLSearchParams(window.location.search).get("id");

  if (id) {
    displayProfile(id);
  } else {
    displayData(photographers);
  }
}

init();
