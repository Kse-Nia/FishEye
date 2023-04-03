// Create elements function
function createElements(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  element.textContent = textContent;
  return element;
}

class displayContactForm {
  constructor() {
    const form = document.querySelector("#contact-form");
    const validationBtn = document.querySelector(".contact_button");
    const closeBtn = createElements("button", {
      class: "close-btn",
    });
    console.log(form);
  }
}

const contactForm = new displayContactForm();
