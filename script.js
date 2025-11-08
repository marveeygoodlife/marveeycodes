"use strict"

const ul = document.querySelector('nav ul');
const ulbtn = document.querySelector('nav button');
 dynamicToggle()
function dynamicToggle() {
    ulbtn.addEventListener("click", () => {
    ul.classList.toggle('active')
})
}