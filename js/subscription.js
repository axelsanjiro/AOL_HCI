const subscriptionForm = document.getElementById("subscriptionForm");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordError = document.getElementById("passwordError");
const successMessage = document.getElementById("successMessage");
const dobInput = document.getElementById("dob");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");

// Error message elements
let passwordStrengthError;
let ageError;
let firstNameError;
let lastNameError;

document.addEventListener("DOMContentLoaded", () => {
  //password validation
  passwordStrengthError = document.createElement("span");
  passwordStrengthError.className = "error-message";
  passwordInput.parentNode.appendChild(passwordStrengthError);

  //age validation
  ageError = document.createElement("span");
  ageError.className = "error-message";
  dobInput.parentNode.appendChild(ageError);

  // First name validation
  firstNameError = document.createElement("span");
  firstNameError.className = "error-message";
  firstNameInput.parentNode.appendChild(firstNameError);

  // Last name validation
  lastNameError = document.createElement("span");
  lastNameError.className = "error-message";
  lastNameInput.parentNode.appendChild(lastNameError);
});

passwordInput.addEventListener("input", validatePasswordStrength);
confirmPasswordInput.addEventListener("input", validatePasswordMatch);

function validatePasswordStrength() {
  const password = passwordInput.value;
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  if (!hasMinLength || !hasNumber) {
    passwordStrengthError.textContent =
      "Password must be at least 8 characters and include at least one number";
    return false;
  } else {
    passwordStrengthError.textContent = "";
    return true;
  }
}

function validatePasswordMatch() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    passwordError.textContent = "Passwords do not match";
    return false;
  } else {
    passwordError.textContent = "";
    return true;
  }
}

// Age validation - minimum 13 years old
function validateAge() {
  const dobDate = new Date(dobInput.value);
  if (isNaN(dobDate.getTime())) {
    ageError.textContent = "Please enter a valid date";
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();

  // Adjust age kalo belum ultah tahun ini
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dobDate.getDate())
  ) {
    age--;
  }

  if (age < 13) {
    ageError.textContent = "You must be at least 13 years old to subscribe";
    return false;
  } else {
    ageError.textContent = "";
    return true;
  }
}

// First name validation - minimum 4 letters
function validateFirstName() {
  if (firstNameInput.value.trim().length < 4) {
    firstNameError.textContent = "First name must be at least 4 letters";
    return false;
  } else {
    firstNameError.textContent = "";
    return true;
  }
}

// Last name validation - minimum 4 letters
function validateLastName() {
  if (lastNameInput.value.trim().length < 4) {
    lastNameError.textContent = "Last name must be at least 4 letters";
    return false;
  } else {
    lastNameError.textContent = "";
    return true;
  }
}

firstNameInput.addEventListener("input", validateFirstName);
lastNameInput.addEventListener("input", validateLastName);

dobInput.addEventListener("change", validateAge);

subscriptionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate all form fields
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isPasswordStrong = validatePasswordStrength();
  const doPasswordsMatch = validatePasswordMatch();
  const isAgeValid = validateAge();

  // proceed if all validations pass
  if (
    !isFirstNameValid ||
    !isLastNameValid ||
    !isPasswordStrong ||
    !doPasswordsMatch ||
    !isAgeValid
  ) {
    return;
  }

  // Get form data
  const subscriptionData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value,
    timestamp: new Date().toISOString(),
  };

  // Save to local storage
  localStorage.setItem("subscriptionData", JSON.stringify(subscriptionData));

  // Show success message
  successMessage.classList.remove("hidden");

  // Reset form
  setTimeout(() => {
    successMessage.classList.add("hidden");
    subscriptionForm.reset();
  }, 5000);
});

dobInput.setAttribute("placeholder", "DD / MM / YYYY");

dobInput.addEventListener("focus", (e) => {
  e.target.type = "date";
  e.target.removeAttribute("placeholder");
});

dobInput.addEventListener("blur", (e) => {
  if (e.target.value === "") {
    e.target.type = "text";
    e.target.setAttribute("placeholder", "DD / MM / YYYY");
  }
});
