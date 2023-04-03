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
    console.error("Error:", error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(
    ".photographer_container"
  );
  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Profile
async function displayProfile() {
  const json = await fetch("/data/photographers.json");
  const data = await json.json();
  const photographers = data.photographers;
  const profile = photographers.find((photographer) => photographer.id == id);

  const photographerProfile = new PhotographerProfileFactory(profile);
  const profileDOM = photographerProfile.getProfileDOM();
  console.log(photographerProfile);
  // Display modal
  const closeBtn = document.querySelector(".close");
  const btnContact = document.querySelector(".profile-contact");
  btnContact.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  });
}

displayProfile();

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
