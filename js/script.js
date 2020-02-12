/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.getElementsByClassName("student-item");
const itemsPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  // display students with matched index
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].classList.remove("hidden");
    } else {
      list[i].classList.add("hidden");
    }
  }
}

// initialize students on page 1
showPage(studentList, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
  // calculate the # of pages needed
  const pagesNeeded = list.length / itemsPerPage;
  let paginationHTML = `
         <div class="pagination">
            <ul class="pagination-list">
      `;

  for (let i = 0; i <= list.length; i++) {
    if (i <= pagesNeeded) {
      let liHTML = `
         <li class="pagination-list-item">
            <a href="#" class="links">${i + 1}</a>
         </li>
         `;

      paginationHTML += liHTML;
    }
  }

  paginationHTML += `
      </ul>
   </div>
  `;

  document.querySelector(".page").innerHTML += paginationHTML;
}

appendPageLinks(studentList);

// make first page link is active by default
const firstA = document.querySelector("a");
firstA.classList.add("active");

const links = document.querySelectorAll(".links");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", e => {
    // remove active from all links
    const active = document.querySelector(".active");
    active.classList.remove("active");

    // add active to link clicked
    const target = e.target;
    target.classList.add("active");

    // add page number clicked to showPage function
    const pageClicked = parseInt(e.target.textContent);
    let item = "";
    showPage(studentList, pageClicked);
  });
}

/*** 
   search component
***/

const pageHeader = document.querySelector(".page-header");
const names = document.querySelectorAll("h3");

// create search bar and button html
const searchHTML = `
<div class="search">
   <input type="text" class="search-bar" placeholder="Search Name">
   <button type="button" class="search-button">Search</button>
</div>
`;

// append search to html
pageHeader.innerHTML += searchHTML;

// searchBar function
const searchBar = document.querySelector(".search-bar");

// listen for users search input and display the students who matches
searchBar.addEventListener("keyup", e => {
  const input = e.target.value;

  for (let i = 0; i < names.length; i++) {
    const studentNames = names[i].textContent.toLowerCase();
    //  traversing up the dom
    const parent1 = names[i].parentElement;
    const parent2 = parent1.parentElement;
    const hidden = parent2.classList.value;

    if (studentNames.indexOf(input) > -1 && hidden.indexOf("hidden") < 0) {
      parent2.classList.remove("hidden");
    } else {
      parent2.classList.add("hideTemp");
    }

    if (input.length === 0 && hidden.indexOf("hideTemp") > -1) {
      parent2.classList.remove("hideTemp");
    }
  }
});

// listen for search button click
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  const searchVal = searchBar.value;

  for (let i = 0; i < names.length; i++) {
    const studentNames = names[i].textContent.toLowerCase();
    //   traversing up the dom
    const parent1 = names[i].parentElement;
    const parent2 = parent1.parentElement;

    if (studentNames.indexOf(searchVal) > -1) {
      parent2.classList.remove("hidden");
    } else {
      parent2.classList.add("hidden");
    }
  }
});
