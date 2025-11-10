import {
  dragElement,
  deletePostIt,
  rightClickElement,
  getFocusedPostIt,
  setActivated,
} from "./post-it-logic.js";

import { addConnection, deleteRelated } from "./connection-logic.js";

let numPosts = 0;
let originalPostIt = document.getElementById("p");

createPostIt(originalPostIt); // initial post-it created
createPostIt(originalPostIt); // second one made for connection testing
applyLogic();

let connectedPosts = new Set();

function connectPostIt(postIt) {
  setActivated(postIt, true);

  if (!connectedPosts.has(postIt)) {
    connectedPosts.add(postIt);

    if (connectedPosts.size == 2) {
      const [post1, post2] = [...connectedPosts];
      addConnection(post1, post2);
      connectedPosts.clear();
    }
  }
}

// creates a new post-it note based on a reference
function createPostIt(reference, exact = false) {
  if (reference) {
    // referencing post-it parts
    let newElement = reference.cloneNode(true);
    let newElementHeader = newElement.querySelector(".post-it-header");

    // setting various attributes
    newElement.id = "p" + numPosts;
    newElementHeader.id = "ph" + numPosts++;
    newElement.hidden = false;

    // duplication and non-duplication
    if (exact) {
      newElement.style.top = parseInt(reference.style.top) + 10 + "px";
      newElement.style.left = parseInt(reference.style.left) + 10 + "px";
    } else {
      newElement.style.top = "0px";
      newElement.style.left = "0px";
      newElement.querySelector(".post-it-content").value = "";
    }

    // applying logic and adding to DOM
    dragElement(newElement);
    setActivated(newElement, false);
    newElement.addEventListener("contextmenu", rightClickElement);
    document.getElementById("moveable-area").appendChild(newElement);
  }
}

// deletion wrapper function
function deleteLogic(postIt) {
  deleteRelated(postIt, setActivated);
  deletePostIt(postIt);
}

// adds event listeners to various elements
function applyLogic() {
  // context menu
  let menu = document.getElementById("contextMenu");
  menu
    .querySelector("#context-connect")
    .addEventListener("click", () => connectPostIt(getFocusedPostIt()));
  menu
    .querySelector("#context-duplicate")
    .addEventListener("click", () => createPostIt(getFocusedPostIt(), true));
  menu
    .querySelector("#context-delete")
    .addEventListener("click", () => deleteLogic(getFocusedPostIt()));
  // other buttons
  document
    .getElementById("duplicate-button")
    .addEventListener("click", () => createPostIt(originalPostIt));
}
