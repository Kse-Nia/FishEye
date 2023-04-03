/* // Create elements function
function createElements(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  element.textContent = textContent;
  return element;
}

function displayContactForm() {
  const form = document.querySelector("#contact-form");
  const validationBtn = document.querySelector(".profile-contact");
  const closeBtn = createElements("button", {
    class: "close-btn",
  });
  console.log(form);
  console.log(validationBtn);

  validationBtn.addEventListener("click", (e) => {
    console.log("click");
    e.preventDefault();
    form.style.display = "block";
  });
}

const contactForm = new displayContactForm();
 */
