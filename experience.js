"use strict"
console.log("experience connected")

//get buttons and experience contents elements
const prevbtn = document.querySelector("#prevbtn");
const nextbtn = document.querySelector("#nextbtn");
const title = document.querySelector("#cardtitle");
const subtitle = document.querySelector("#subtitle");
const liOne = document.querySelector("#list-one");
const liTwo = document.querySelector("#list-two");
const liThree = document.querySelector("#list-three");
/* const liFour = document.querySelector("#list-four"); 
 */
// arrays of experience show card
const cards = [
    {
        id: 1,
        title: 'Apprentice',
        subtitle: `<strong>PureTech Computer Training School </strong> | February 2024 - June 2024.`,
        list1: `Assisted customers with document processing, editing, printing, laminating, spiral
binding, and scanning. `,
        list2: `Handled customer service, ensuring smooth communication and assistance.`,
        list3: `Applied Microsoft Office tools, including Word, PowerPoint and Excel, for various
tasks.  Operated office equipment’s such as scanners, photocopiers, laminators, and binding machines etc. to meet customers’ needs.`,
    },
    
    {
        id: 2,
        title: 'Web Development Intern',
        subtitle: '<strong>PureTech Computer Training School</strong> | August 2024 - December 2024',
        list1: `Acquired Front-End development skills, (HTML, CSS, JavaScript, and
responsive web design principles)`,
        list2: `Built websites from scratch, focusing on creating user-friendly
interfaces and applying unique styling techniques to enhance user experience.`,
        list3: `Collaborated as part of a front-end developer team on MetaMagnetAi project,
contributing to the development  of innovative web solutions.`
    },
    {
        id: 3,
        title: `Certifications`,
        subtitle: `Certificates I own`,
        list1: `Front-End Web Development Certification - freeCodeCamp (2024)`,
        list2: `JavaScript Algorithms and Data Structures - freeCodeCamp (In-VIEW)`,
        list3: `Hp Life Awareness`,
    }
    
]
let currentitem = 0;
// default show card to show on dom content load
document.addEventListener("DOMContentLoaded", () =>{
    const item = cards[currentitem];
    title.textContent = item.title;
    // subtitle may include simple markup (e.g. <strong>), render as HTML
    subtitle.innerHTML = item.subtitle;
    liOne.textContent = item.list1;
    liTwo.textContent = item.list2;
    liThree.textContent = item.list3;
 })
// initialize carditem and set the array to first index
    //set all element textcontent to card object
function showCard(card) {
    const item = cards[card];
    if (!item) return;
     title.textContent = item.title;
     subtitle.innerHTML = item.subtitle;
    liOne.textContent = item.list1;
    liTwo.textContent = item.list2;
    liThree.textContent = item.list3;
  // announce the currently visible card for screen readers
  try {
    const carouselRegion = document.querySelector('[role="region"][aria-label="card carousel"]');
    if (carouselRegion) {
      // use plain text content to avoid announcing HTML tags
      const announcement = `${title.textContent}. ${subtitle.textContent}`;
      carouselRegion.textContent = announcement;
    }
  } catch (e) {
    // fail silently if DOM is not available
  }
 }
// declare show card function
    //initialize card item set the array index to card
    
// prev button to show previous style
// listen for click
// decrement current item
// check if its less than o then
//set current item to cardlenght-1
// call show card - pass current item
prevbtn.addEventListener("click", () => {
    currentitem--;
    if (currentitem < 0) {
        // wrap to last index of the cards array
        currentitem = cards.length - 1;
    };
    showCard(currentitem);

    
})


// next button
//listen for click
// increment it

//check it its greater than card length - 1
// set current item to 0 (reset)
//call show card
nextbtn.addEventListener("click", () => {
    currentitem++;
    if (currentitem > cards.length - 1) {
        currentitem = 0;
    }
    showCard(currentitem);
});

// Keyboard navigation for experience cards
// Place after prev/next handlers or at end of experience.js
document.addEventListener('keydown', (e) => {
  // Ignore key events when focus is in form fields or contenteditable areas
  const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

  switch (e.key) {
    case 'ArrowLeft':
      // go to previous card
      prevbtn.click();
      break;
    case 'ArrowRight':
      // go to next card
      nextbtn.click();
      break;
    case 'Home':
      // go to first card
      currentitem = 0;
      showCard(currentitem);
      break;
    case 'End':
      // go to last card
      currentitem = cards.length - 1;
      showCard(currentitem);
      break;
    default:
      // ignore other keys
      break;
  }
});