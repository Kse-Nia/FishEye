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
      console.log("click");
    });

    this.closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.modal.style.display = "none";
      console.log("click");
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm(e)) {
        console.log("Form submitted");
        this.modal.style.display = "none";
        this.form.reset();
      } else {
        console.log("Form not valid");
      }
    });
  }

  validateForm(e) {
    e.preventDefault();
    const firstNameInput = this.form.querySelector("input[name='firstname']");
    const nameInput = this.form.querySelector("input[name='name']");
    const emailInput = this.form.querySelector("input[name='email']");
    const messageInput = this.form.querySelector("textarea[name='message']");
    const emailRegex =
      /\A[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z/;
    let isValid = true;

    if (!firstNameInput.value.length < 2 || firstNameInput.value.trim()) {
      isValid = false;
      nameInput.classList.add("error");
    } else {
      nameInput.classList.remove("error");
    }
    if (!nameInput.value.length < 2) {
      isValid = false;
      nameInput.classList.add("error");
    } else {
      nameInput.classList.remove("error");
    }
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      emailInput.classList.add("error");
    } else {
      emailInput.classList.remove("error");
    }
    if (!messageInput.value) {
      isValid = false;
      messageInput.classList.add("error");
    } else {
      messageInput.classList.remove("error");
    }
    if (isValid) {
      console.log("Tout est ok ! :)");
    }
    return isValid;
  }
}
