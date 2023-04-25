/* eslint-disable no-unused-vars */
import { updateDisplay } from "../pages/category";
const checkMark = document?.querySelector("span .checkmark");

function unclickCheckbox() {
  checkMark.style.background = "transparent";
}

const checkboxes = document?.querySelectorAll(".checkbox__input");


//change image of checkbox
/**
 * Adds a click event listener to each checkbox element in the checkboxes array.
 * When a checkbox is clicked, the background image of the next element sibling is toggled
 * between a filled checkbox and an empty checkbox. The updateDisplay function is called
 * to update the display.
 * @param {NodeListOf<HTMLInputElement>} checkboxes - an array of checkbox elements
 * @returns None
 */
for (const box of checkboxes) {
  box?.addEventListener("click", (e) => {
    let next = box.nextElementSibling;
    if (
      next.style.backgroundImage ==
      `url("../../assets/icon/checkbox-filled.svg")`
    ) {
      // not checked icon
      next.style.backgroundImage = "url(../../assets/icon/checkbox-icon.svg)";
    } else {
      // checked-box
      next.style.backgroundImage = "url(../../assets/icon/checkbox-filled.svg)";
    }
    updateDisplay()
  });
}

