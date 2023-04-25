/* eslint-disable no-unused-vars */

const submitAddTitleButton = document?.querySelector("#form-add-title");
const formItems = submitAddTitleButton?.querySelectorAll(".form-item__content");

function submitAddTitle() {
  const valid = validateForm();
  console.log("valid", valid);
  if (valid) {
    // btnAddTitleOnClick()
  }
}
/**
 * Loops through each form item and adds an event listener to the input element.
 * When the input value changes, it logs the new value and removes any remote class errors.
 * @param {NodeListOf<Element>} formItems - The list of form items to loop through.
 * @returns None
 */
if (formItems) {
  for (const items of formItems) {
    const item = items?.querySelector("input");
    item?.addEventListener("input", function (e) {
      remoteClassError(item);
    });
  }
}
/**
 * Removes the "invalid" class from the given item's class list and hides the error message
 * associated with it.
 * @param {HTMLElement} item - The HTML element to remove the "invalid" class from.
 * @returns None
 */
function remoteClassError(item) {
  item.classList.remove("invalid");
  item.nextElementSibling.classList.remove("active");
  item.nextElementSibling.innerHTML = "";
}
/**
 * validate form
 * @returns true if valid / false if invalid
 */
function validateForm() {
  try {
    let valid = true;
    for (const items of formItems) {
      //get input box
      const item = items?.querySelector("input");
      //if input is required
      if (item !== null && item.hasAttribute("required")) {
        if (item.value == "") {
          //if value is empty
          //show error message
          const label = item.getAttribute("label");
          item.classList.add("invalid");
          item.nextElementSibling.classList.add("active");
          item.nextElementSibling.innerHTML = `${label} không được để trống`;
          valid = false;
        } else {
          remoteClassError(item);
        }
      }
    }
    return valid;
  } catch (error) {
    console.error(error);
  }
}
