class ContactForm {
  constructor(openContact) {
    this.form = document.querySelector("#contact-form");
    this.modal = document.querySelector(".modal");
    this.openContact = openContact;
    this.closeBtn = document.querySelector(".close-btn");
    this.init(); // initialization
  }

  init() {
    this.openContact.addEventListener("click", (e) => {
      e.preventDefault();
      this.modal.style.display = "block";
    });
    this.closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.modal.style.display = "none";
    });
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm(e)) {
        this.form.reset();
      } else {
        console.log("Form not valid");
      }
    });
  }
  validateForm(e) {
    e.preventDefault();
    const firstNameInput = this.form.querySelector("input[name='firstname']");
    const lastNameInput = this.form.querySelector("input[name='lastname']");
    const emailInput = this.form.querySelector("input[name='email']");
    const messageInput = this.form.querySelector("textarea[name='message']");
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    let isValid = true;

    const errorVerification = (condition) => {
      if (!condition) {
        isValid = false;
      } else {
        console.log("Envoyé");
      }
    };
    errorVerification(firstNameInput, firstNameInput.value.trim().length < 2);
    errorVerification(lastNameInput, lastNameInput.value.trim().length < 2);
    errorVerification(emailInput, !emailRegex.test(emailInput.value));
    errorVerification(messageInput, !messageInput.value.trim());

    if (isValid) {
      console.log("Message envoyé");
    }
    return isValid;
  }
}
