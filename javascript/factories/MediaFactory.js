// Create elements function
function createElements(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  element.textContent = textContent;
  return element;
}

function getMedia(data) {
  const { id, photographerId, title, image, likes, video, date, price } = data;

  const mediaContainer = document.querySelector("#media-container");
  const pictures = `./assets/Photos/${photographerId}/${image}`;
  console.log(pictures);

  const card = createElements("card", {
    class: "media-card",
    "data-id": id,
  });

  const elements = [
    createElements("img", {
      src: pictures,
      alt: title,
      class: "media-picture",
    }),
    createElements("div", {
      class: "media-info",
    }),
  ];

  elements.forEach((element) => card.appendChild(element));
}
