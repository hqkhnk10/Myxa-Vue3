/* eslint-disable no-unused-vars */

const info = document?.querySelector(".popup__info");
const warning = document?.querySelector(".popup__warning");
const success = document?.querySelector(".popup__success");
const errorPopup = document?.querySelector(".popup__error");

function openInfo(){
    info.style.display = "none";
    info.style.display = "flex";
}
function closeInfo(){
    info.style.display = "none";
}
function openWarning(){
    warning.style.display = "none";
    warning.style.display = "flex";
}
function closeWarning(){
    warning.style.display = "none";
}
function openSuccess(){
    success.style.display = "none";
    success.style.display = "flex";
}
function closeSuccess(){
    success.style.display = "none";
}
function openError(){
    errorPopup.style.display = "none";
    errorPopup.style.display = "flex";
}
function closeError(){
    errorPopup.style.display = "none";
}