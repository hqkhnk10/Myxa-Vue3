/* eslint-disable no-unused-vars */

let x, i, j, l, ll, selElmnt, a, b, c,icon_click;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
icon_click = document.getElementsByClassName("select__icon");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("input");
  a.setAttribute("class", "select-selected");
  a.setAttribute("label", x[i].getAttribute("label"));
  a.setAttribute("autocomplete", "off");
  a.setAttribute("style", "min-width:70px;padding:0 0 0 12px;width:100%");
  if(x[i].hasAttribute("required")){
    // a.setAttribute("required",true)
    // const error = document.createElement("div");
    // error.setAttribute("class", "error");
    // a.append(error)
  }
  a.value = selElmnt.options[1].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    if(j==1){
      c.setAttribute("class", "same-as-selected");
    }
    c.innerHTML = selElmnt.options[j].innerHTML;
    c?.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.value = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  //when click the icon in the select-box
  for(const icon of icon_click){
    icon?.addEventListener("click",function(e){
      e.stopPropagation();
        const next =  icon.nextElementSibling.nextElementSibling;
        //toggle show/hide of the dropdown
        if(next.nextElementSibling.style.display == "block"){
            next.nextElementSibling.style.display = "none";
        }
        else{
            next.nextElementSibling.style.display = "block";
            //if the dont have height to dropdown then the dropdown move up
            if(window.innerHeight - e.clientY< next.nextElementSibling.clientHeight){
                next.nextElementSibling.style.top = '-' +next.nextElementSibling.clientHeight + 'px';
            }
            else{
                next.nextElementSibling.style.top = '100%';
            }
        }

        next.classList.toggle("select-arrow-active");
        next.nextElementSibling.classList.toggle("select-hide");
      })
  }
  a?.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
        //toggle show/hide of the dropdown
      if(this.nextSibling.style.display == "block"){
        this.nextSibling.style.display = "none";
    }
    else{
        this.nextSibling.style.display = "block";
    }
      this.classList.toggle("select-arrow-active");
            //if the dont have height to dropdown then the dropdown move up
      if(window.innerHeight - e.clientY< this.nextSibling.clientHeight){
          this.nextSibling.style.top = '-' +this.nextSibling.clientHeight + 'px';
      }
      else{
        this.nextSibling.style.top = '100%'
      }
    });
}
/**
 * Closes all select dropdown menus except for the one that was clicked on.
 * @param {HTMLElement} elmnt - The element that was clicked on.
 * @returns None
 */
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document?.addEventListener("click", closeAllSelect);