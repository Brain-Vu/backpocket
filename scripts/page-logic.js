import {
  dragElement,
  deleteElement,
  rightClickElement,
  getFocusedPostIt,
  setActivated,
} from "./post-it-logic.js";

let numPosts = 0;
let originalPostIt = document.getElementById("p");

createPostIt(originalPostIt); // initial post-it created
applyLogic();

// creates a connection between two post
function createConnection(postIt1, postIt2){

}

let connectedPosts = new Set();

function connectPostIt(postIt) {
  setActivated(postIt, true)
  if (!connectedPosts.has(postIt)) {
    connectedPosts.add(postIt);
    if (connectedPosts.size == 2) {
      console.log("Connected two");
      connectedPosts.clear();
    }
  }
}


// creates a new post-it note based on a reference
function createPostIt(reference, exact = false) {
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
    dragElement(newElement);
    setActivated(newElement, false);
    newElement.addEventListener("contextmenu", rightClickElement);
    document.getElementById("moveable-area").appendChild(newElement);
    
  }
}

// adds event listeners to vaiorus elements
function applyLogic() {
  // other buttons
  document
    .getElementById("duplicate-button")
    .addEventListener("click", () => createPostIt(originalPostIt));

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
    .addEventListener("click", () => deleteElement(getFocusedPostIt()));
  
}

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
