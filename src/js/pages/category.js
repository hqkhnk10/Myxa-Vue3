/* eslint-disable no-unused-vars */
const addTitle = document.querySelector("#dialog-add-title");
const tableSelection = document.querySelector("table");
const checkBoxes = tableSelection.querySelectorAll(".checkmark__table");
const checkBoxHeader = tableSelection.querySelector(".checkmark__table-header");
const checkAll = tableSelection.querySelector("#check-all");
const crudButtonHeader = document.querySelector("#crud-button-header");
const filterIcon = document.querySelector("#filter-icon");
const removeFilterButton = document.querySelector("#remove-filter-button");

const notChecked = `url("../../assets/icon/checkbox-icon.svg")`;
const checked = `url("../../assets/icon/checkbox-filled.svg")`;
const halfChecked = `url("../../assets/icon/checkbox-table-icon.svg")`;
/**
 * Toggles the "show" class on the addTitle element and focuses on the first input element.
 * @returns None
 */
function btnAddTitleOnClick() {
  addTitle.classList.toggle("show");
  addTitle.querySelector("#first-input").focus();
}

/**
 * Updates the display of the checkbox header based on the state of the checkboxes.
 * @returns None
 */
let checkedCount = 0;
export function updateDisplay() {
  checkedCount = 0;
  for (const box of checkBoxes) {
    if (box.style.backgroundImage == checked) {
      checkedCount++;
    }
  }
  //check 0 boxes
  if (checkedCount === 0) {
    checkBoxHeader.style.backgroundImage = notChecked;
  } else if (checkedCount === checkBoxes.length) {
    //check all boxes
    checkBoxHeader.style.backgroundImage = checked;
  } else {
    //check a few boxes
    checkBoxHeader.style.backgroundImage = halfChecked;
  }
  updateCount(checkedCount)
}

/**
 * Attaches a click event listener to the checkAll element. When clicked, this function
 * will check or uncheck all of the checkBoxes and update the checkedCount.
 * @param {function} event - the click event
 * @returns None
 */
checkAll.addEventListener("click", function (event) {
  checkedCount = 0;
  if (checkBoxHeader.style.backgroundImage == checked) {
    checkBoxHeader.style.backgroundImage = notChecked;
    for (const box of checkBoxes) {
      box.style.backgroundImage = notChecked
    }
  } else {
    checkBoxHeader.style.backgroundImage = checked;
    for (const box of checkBoxes) {
      box.style.backgroundImage = checked
      checkedCount++;
    }
  }
  updateCount(checkedCount)
});

/**
 * Updates the count of selected rows and shows/hides the appropriate elements.
 * @param {number} count - The number of rows selected.
 * @returns None
 */
function updateCount(count){
  if(count > 0){
    crudButtonHeader.previousElementSibling.classList.add("hide");
    crudButtonHeader.querySelector("#row-selected-count").innerHTML = count;
    crudButtonHeader.classList.add("flex");
  }
  else{
    crudButtonHeader.previousElementSibling.classList.remove("hide");
    crudButtonHeader.classList.remove("flex");
  }
}

/**
 * Removes the selected row by unchecking the checkbox and updating the display.
 * @returns None
 */
function removeSelectedRow(){
  for (const box of checkBoxes) {
    if (box.style.backgroundImage == checked) {
      box.style.backgroundImage = notChecked
      checkedCount--;
    }
  }
  updateDisplay()
}
function changeFilterIcon(){
  filterIcon.classList.add("icon__filter-status")
  removeFilterButton.classList.add("show")
}
function removeFilter(){
  filterIcon.classList.remove("icon__filter-status")
  removeFilterButton.classList.remove("show")
}