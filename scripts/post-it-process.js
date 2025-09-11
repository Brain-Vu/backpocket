import {
  dragElement,
  deleteElement,
  rightClickElement,
} from "./post-it-logic.js";

let numPosts = 0;
let originalPostIt = document.getElementById("p");
let focusedPostIt = null;

create(originalPostIt);

// allows the creation of a new post-it note, exact determines if it should be exact copy

function create(reference, exact = false) {
  if (reference) {
    let newElement = reference.cloneNode(true);
    let newElementHeader = newElement.querySelector(".post-it-header");

    newElement.hidden = false;
    newElement.id = "p" + numPosts;
    newElementHeader.id = "ph" + numPosts++;

    if (exact) {
      newElement.style.top = parseInt(reference.style.top) + 10 + "px";
      newElement.style.left = parseInt(reference.style.left) + 10 + "px";
    } else {
      newElement.style.top = "0px";
      newElement.style.left = "0px";
      newElement.querySelector(".post-it-content").value = "";
    }

    document.getElementById("moveable-area").appendChild(newElement);

    // adding logic
    dragElement(newElement.id);
    newElement.addEventListener("contextmenu", rightClickElement);
  }
}

document
  .getElementById("duplicate-button")
  .addEventListener("click", () => create(originalPostIt));


// document
//   .getElementById("allposts")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // stops automatic reloading

//     const formData = new FormData(this);
//     const post1 = formData.get("post1");
//     const post2 = formData.get("post2");

//     const posts = [];
//     posts.push(post1, post2);
//     logTs(posts);
//   });

// function logTs(posts) {
//   for (const t of posts) {
//     console.log(t);
//   }
// }

export { create };
