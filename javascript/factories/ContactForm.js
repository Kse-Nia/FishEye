class ContactForm {
  constructor(openContact, profileName) {
    this.form = document.querySelector("#contact-form");
    this.modal = document.querySelector(".modal");
    this.openContact = openContact;
    this.closeBtn = document.querySelector(".close-btn");
    this.profileName = profileName;
    this.init();
  }

  init() {
    // Accessibility part
    this.openContact.setAttribute("tabindex", "0");
    this.closeBtn.setAttribute("tabindex", "0");

    this.openContact.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.modal.style.display = "block";
        this.profileName();
        console.log("open with key");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc" || e.key === 27) {
        e.preventDefault();
        this.modal.style.display = "none";
      }
    });

    this.openContact.addEventListener("click", (e) => {
      e.preventDefault();
      this.modal.style.display = "block";
      this.photographName();
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
  photographName() {
    const photographerName = document.querySelector(".contact-name");
    photographerName.textContent = this.profileName;
    console.log("contact-name", photographerName);
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
        throw new Error("Le formulaire n'est pas valide");
      }
    };
    errorVerification(firstNameInput, firstNameInput.value.trim().length < 2);
    errorVerification(lastNameInput, lastNameInput.value.trim().length < 2);
    errorVerification(emailInput, !emailRegex.test(emailInput.value));
    errorVerification(messageInput, !messageInput.value.trim().length < 5);

    if (isValid) {
      console.log("Message envoyé");
    }
    return isValid;
  }
}
