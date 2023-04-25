/* eslint-disable no-unused-vars */

let cells = document?.querySelectorAll("td");
let mainBodyTable = document?.querySelector(".main__body-table");
let main = document?.querySelector(".main");



/**
 * Adds event listeners to each cell in a table. When a cell is hovered over, the button__table
 * element in the last child of the row is moved to the right side of the table. When a cell is clicked,
 * all other cells in the table are set to have a white background color and the clicked cell's row is set
 * to have a green background color.
 * @param {HTMLCollectionOf<HTMLTableCellElement>} cells - The cells in the table to add event listeners to.
 * @returns None
 */
for (const cell of cells) {
  const rowSelector = cell.parentElement
    cell?.addEventListener("mouseover", function(){
      // rowSelector.lastElementChild?.querySelector(".button__table").style.left = main.clientWidth - 32 - 100 + mainBodyTable.scrollLeft + "px";
    });
    cell?.addEventListener("click", function(){
      // for (const otherCell of cells) {
      //   otherCell.parentElement.classList.remove("focus__table");
      // }
      console.log('rowSelector', rowSelector);
      rowSelector.focus();
    });
}
