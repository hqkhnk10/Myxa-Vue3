initCustomComponent();

/**
 * Sets up the page by initializing the combo box, combo items, and combo inputs
 * when the window loads.
 * @returns None
 */
window.onload = () => {
  initComboBox();
  initComboItems();
  initComboInputs();
};

const mComboBox = document?.querySelectorAll(".mcombobox");
const mComboBoxItems = document?.querySelectorAll(".mcombobox-item");
const mComboBoxInputs = document?.querySelectorAll(".mcombobox__input");

/**
 * Debounces the `filterComboData` function to prevent it from being called too frequently.
 * @param {Event} e - The event object that triggered the function call.
 * @returns None
 */
const processChange = debounce((e) => filterComboData(e));
/**
 * Initializes combo box inputs by adding an event listener to each input element.
 * When the input value changes, the function clears the combo box data and shows a loading spinner.
 * Then, it calls the processChange function to handle the input change.
 * @returns None
 */
function initComboInputs() {
  for (const input of mComboBoxInputs) {
    input?.addEventListener("input", function (e) {
      const parentCombo = e.target.parentNode;
      const mComboData = parentCombo?.querySelector(".mcombobox__data");
      mComboData.innerHTML = "";
      const loading = parentCombo?.querySelector(".loading");
      loading.classList.add("show");
      processChange(e);
    });
  }
}

/**
 * Returns a debounced version of the given function that will only execute after a certain
 * amount of time has passed since the last time it was called.
 * @param {function} func - the function to debounce
 * @param {number} [timeout=300] - the amount of time to wait before executing the function
 * @returns A debounced version of the given function.
 */
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
/**
 * Filters the combo box data based on the user's input and updates the combo box accordingly.
 * @param {Event} e - The event object that triggered the function.
 * @returns None
 */
async function filterComboData(e) {
  const parentCombo = e.target.parentNode;
  const mComboData = parentCombo?.querySelector(".mcombobox__data");
  mComboData.innerHTML = "";
  const propText = mComboData.getAttribute("propText");
  const propValue = mComboData.getAttribute("propValue");

  const datas = mComboData.data.filter((data) =>
    data[propText].includes(e.target.value)
  );
  datas.forEach((data) =>
    createComboBoxItem(data, propValue, propText, mComboData)
  );

  const loading = parentCombo?.querySelector(".loading");
  loading.classList.remove("show");
}

/**
 * Initializes the combo box by adding a click event listener to each combo box element.
 * When clicked, the function fetches data from the specified API and creates combo box items
 * based on the returned data.
 * @param {number} [pageSize=10] - The number of items to display per page.
 * @returns None
 */
function initComboBox(pageSize = 10) {
  let pageIndex = 0;
  for (const box of mComboBox) {
    box?.addEventListener("click", async function () {
      const parentCombo = this;
      const mComboData = parentCombo?.querySelector(".mcombobox__data");
      const api = mComboData.getAttribute("api");
      if (api != null && !mComboData.data) {
        const propText = mComboData.getAttribute("propText");
        const propValue = mComboData.getAttribute("propValue");
        const loading = parentCombo?.querySelector(".loading");
        await fetch(`${api}?pageSize=${pageSize}&pageIndex=${pageIndex}`)
          .then((res) => {
            loading.classList.add("show");
            return res.json();
          })
          .then((datas) => {
            mComboData.data = datas;
            datas.forEach((data) =>
              createComboBoxItem(data, propValue, propText, mComboData)
            );
          })
          .catch((error) => {
            console.error("error", error);
          })
          .finally(() => {
            loading.classList.remove("show");
          });
      }
      mComboData.classList.toggle("grid-show");

      if (mComboData.classList.contains("grid-show")) {
        const firstItem = mComboData?.querySelector(".mcombobox-item");
        if (firstItem && !mComboData?.querySelector(".selected"))
          firstItem.classList.add("selected");
      }
    });
  }
  /**
   * Adds a scroll event listener to each mComboBox element and increments the pageIndex
   * variable when the user has scrolled to the bottom of the dropdown list.
   * @param {NodeListOf<Element>} mComboBox - a list of mComboBox elements to add the listener to
   * @returns None
   */
  mComboBox.forEach((box) => {
    const mComboData = box?.querySelector(".mcombobox__data");
    mComboData?.addEventListener("scroll", function () {
      if (
        mComboData.scrollTop + mComboData.clientHeight >=
        mComboData.scrollHeight
      ) {
        pageIndex++;
      }
    });
  });
}

/**
 * Adds an event listener to the document that listens for keydown events. If the key pressed is the
 * ArrowDown or ArrowUp key, the next or previous element with the class 'mcombobox-item' is selected
 * and the scroll position of the parent element is adjusted to show the selected element. If the key
 * pressed is the Enter key, the selected element is removed from the grid and an event is added to it.
 * @param {Event} e - the keydown event
 * @returns None
 */
document?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const currentSelected = document?.querySelector(".mcombobox-item.selected");
    if (!currentSelected) return;
    let nextSelected;
    if (e.key === "ArrowDown")
      nextSelected = currentSelected.nextElementSibling;
    else nextSelected = currentSelected.previousElementSibling;
    if (!nextSelected) return;
    currentSelected.classList.remove("selected");
    nextSelected.classList.add("selected");

    // Scroll the list
    const mComboData = nextSelected.parentNode;
    mComboData.scrollTop = nextSelected.offsetTop - mComboData.offsetTop;
  } else if (e.key === "Enter") {
    const currentSelected = document?.querySelector(".mcombobox-item.selected");
    if (!currentSelected) return;

    // Hide the mComboData element
    const mComboData = currentSelected.parentNode;
    mComboData.classList.remove("grid-show");

    addEventOnClickComboItem(currentSelected);
  }
});

/**
 * Initializes the combo box items by adding a click event listener to each item.
 * When an item is clicked, the addEventOnClickComboItem function is called with the clicked item as an argument.
 * @returns None
 */
function initComboItems() {
  for (const item of mComboBoxItems) {
    item?.addEventListener("click", function () {
      addEventOnClickComboItem(item);
    });
  }
}
/**
 * Adds an event listener to a combo item that sets the value of the parent combo box
 * to the value of the selected item.
 * @param {HTMLElement} item - the combo item to add the event listener to
 * @returns None
 */
function addEventOnClickComboItem(item) {
  const mComboData = item.parentNode;
  const parentCombo = mComboData.parentNode;
  const input = parentCombo?.querySelector("input");
  for (const comboItem of mComboData.children) {
    comboItem.classList.remove("selected");
  }
  item.classList.add("selected");
  input.value = item.innerHTML;
  parentCombo.value = item.getAttribute("value");
  mComboData.classList.remove("show");
}

/**
 * Initializes custom components for m-combo-box elements on the page.
 * This function creates a div, input, span, button, and comboItem element for each m-combo-box element.
 * The created elements are then appended to the m-combo-box element.
 * @returns None
 */
function initCustomComponent() {
  const mcombobox = document?.querySelectorAll("m-combo-box");
  for (const box of mcombobox) {
    const div = createElementWithAttributes("div", { class: "mcombobox" });
    const input = createElementWithAttributes("input", {
      class: "mcombobox__input",
    });
    const span = createElementWithAttributes("span", {
      class: "input__icon",
      style: "right: 40px;",
    });
    const img = createElementWithAttributes("span", {
      class: "loading",
      src: "/assets/icon/loading-icon.svg",
    });
    span.appendChild(img);
    const button = createElementWithAttributes("button", {
      class: "mcombobox__button",
    });
    const comboItem = createElementWithAttributes("div", {
      class: "mcombobox__data",
      api: box.getAttribute("api"),
      propText: box.getAttribute("propText"),
      propValue: box.getAttribute("propValue"),
    });
    div.append(input, span, button, comboItem);
    box.appendChild(div);
  }
}

/**
 * Creates a new HTML element with the specified tag name and attributes.
 * @param {string} tagName - The tag name of the element to create.
 * @param {Object} attributes - An object containing the attributes to set on the element.
 * @returns {HTMLElement} - The newly created HTML element.
 */
function createElementWithAttributes(tagName, attributes) {
  const element = document.createElement(tagName);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

/**
 * Creates a combo box item with the given data and adds it to the combo box.
 * @param {Object} data - The data object for the combo box item.
 * @param {string} propValue - The property name for the value of the combo box item.
 * @param {string} propText - The property name for the text of the combo box item.
 * @param {HTMLElement} mComboData - The combo box element to add the item to.
 * @returns None
 */
function createComboBoxItem(data, propValue, propText, mComboData) {
  const comboBoxItem = document.createElement("a");
  comboBoxItem.setAttribute("class", "mcombobox-item");
  comboBoxItem.setAttribute("href", "#");
  comboBoxItem.setAttribute("value", data[propValue]);
  comboBoxItem.innerHTML = data[propText];
  comboBoxItem?.addEventListener("click", function () {
    addEventOnClickComboItem(comboBoxItem);
  });
  mComboData.appendChild(comboBoxItem);
}
