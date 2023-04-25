/* eslint-disable no-unused-vars */

const form = document?.querySelector("form");
const email = document.getElementById("mail");
const error = document?.querySelector(".error");
const loading = document?.querySelector(".loading");
const approve = document?.querySelector(".approve");

function fakeLoading(){
  loading.style.display = "inline-block"
  setTimeout(submit, 1000);
}
function submit() {
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!isValid) {
    email.className = "invalid";
    error.textContent = "Sai định dạng email";
    error.className = "error active";
  } else {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
    approve.style.display="block"
  }
  loading.style.display = "none";
}
// As per the HTML Specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
window?.addEventListener("load", () => {
  // Here, we test if the field is empty (remember, the field is not required)
  // If it is not, we check if its content is a well-formed email address.
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  email.className = isValid ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
email?.addEventListener("input", () => {
});

// This defines what happens when the user tries to submit the data
form?.addEventListener("submit", (event) => {
  event.preventDefault();
});