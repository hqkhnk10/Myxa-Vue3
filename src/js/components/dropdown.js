/* eslint-disable no-unused-vars */

const dropdown = document?.querySelector(".dropdown-content");
const icon__threedots = document?.querySelectorAll(".icon__threedots");
function showDropdown() {
  dropdown.classList.toggle("activeflex");
}
/**
 * Adds a click event listener to each icon in the icon__threedots array, which triggers
 * the dropDownList function.
 * @param {Array} icon__threedots - An array of icon elements to add the event listener to.
 * @returns None
 */
for (const icon of icon__threedots) {
  icon?.addEventListener("click", function (e) {
    dropDownList(icon);
  });
}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropDownList(e) {
  const myDrop = e.nextElementSibling.nextElementSibling;
  if (myDrop.style.display == "block") {
    myDrop.style.display = "none";
  } else {
    myDrop.style.display = "block";
  }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
