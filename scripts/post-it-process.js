import { dragElement, deleteElement, rightClickElement } from "./post-it-logic.js";

let num_posts = 0;
create();

function create() {
  let original = document.getElementById("p");

  if (original) {
    let duplicate = original.cloneNode(true);
    duplicate.hidden = false;
    let duplicate_header = duplicate.querySelector(".post-it-header");

    duplicate.id = "p" + num_posts;
    duplicate_header.id = "ph" + num_posts++;

    duplicate.style.top = "0px";
    duplicate.style.left = "0px";

    duplicate.querySelector(".post-it-content").value = "";
    document.getElementById("moveable-area").appendChild(duplicate);

    dragElement(duplicate.id);

    duplicate.addEventListener("contextmenu", rightClickElement)
    duplicate_header.querySelector(".post-it-exit").addEventListener("click", deleteElement);
   }
}

document.getElementById("duplicate-button").addEventListener("click", create);

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
