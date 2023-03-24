// Function fetch data
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
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function redirectToProfile(id) {
  window.location.href = `/pages/photographer.html?id=${id}`;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(
    ".photographer_container"
  );

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  photographersSection.addEventListener("click", () => {
    redirectToProfile(photographer.id);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
