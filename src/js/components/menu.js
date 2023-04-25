/* eslint-disable no-unused-vars */
const closeMenu = document.querySelector(".closemenu");
const aside = document.querySelector(".aside");
const menuTitles = document.querySelectorAll(".submenu__title");
const menuRightIcons = document.querySelectorAll(".menu-item-icon-right");
const menuItems = document.querySelectorAll(".submenu");
const iframe = document.querySelector("#iframe")

/**
 * Attaches an event listener to the closeMenu element that toggles the visibility of
 * the menu titles, right icons, and the size of the aside element.
 * @param {Event} e - The event object.
 * @returns None
 */
closeMenu?.addEventListener("click", function(){
    for(const menu of menuTitles){
        menu.classList.toggle("hide")
    }
    for(const menu of menuRightIcons){
        menu.classList.toggle("hide")
    }
    aside.classList.toggle("small")
    closeMenu.classList.toggle("rotate");
})
/**
 * Adds a click event listener to each menu item in the menuItems array. When a menu item is clicked,
 * it removes the "menu-item-selected" class from all menu items and adds it to the clicked menu item.
 * It then gets the "router" attribute of the clicked menu item and sets the "src" attribute of the iframe
 * to the value of the "router" attribute. If the "router" attribute is null, it redirects the user to the
 * 404 page.
 * @param {Array} menuItems - An array of menu items to add the click event listener to.
 * @returns None
 */
for(const menu of menuItems){
    menu.addEventListener("click", function(){
        menuItems.forEach(element => {
            element.classList.remove("menu-item-selected")
        });
        menu.classList.add("menu-item-selected")
        const router = menu.getAttribute("router")
        console.log('router', router);
        if(router != null){
            iframe.setAttribute("src",router)
        }
        else{
            window.location.href = "../../views/pages/404.html"
        }
    })
}