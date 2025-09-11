import { create } from "./post-it-process.js";

let order = 0;
let focusedPostIt;
let menu = document.getElementById("contextMenu");

dragElement("p");

function rightClickElement(event) {
  event.preventDefault();

  document.onclick = () => {
    menu.hidden = true;
  };

  menu.hidden = false;
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";

  focusedPostIt = event.target.closest(".post-it");
  console.log(focusedPostIt);
}

function deleteElement(element) {
  element.remove();
}

function dragElement(postItID) {
  const moveableArea = document.getElementById("moveable-area");
  const moveableRect = moveableArea.getBoundingClientRect();

  let postIt = document.getElementById(postItID);

  let postItHeader = postIt.querySelector(".post-it-header");
  const postItRect = postIt.getBoundingClientRect();

  let currX = 0,
    currY = 0,
    offsetX = 0,
    offsetY = 0,
    newPosX = 0,
    newPosY = 0,
    maxX = moveableRect.width,
    maxY = moveableRect.height,
    postItWidth = postItRect.width,
    postItHeight = postItRect.height;

  postItHeader.addEventListener("mousedown", mouseDown);

  function mouseDown(e) {
    e.preventDefault();
    currX = e.clientX;
    currY = e.clientY;

    offsetX = e.clientX - parseInt(postIt.style.left || 0);
    offsetY = e.clientY - parseInt(postIt.style.top || 0);

    postIt.style.zIndex = "" + order++;

    document.addEventListener("mousemove", mouseDrag);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseDrag(e) {
    e.preventDefault();

    postIt.style.boxShadow = "10px 10px 10px black";

    currX = e.clientX;
    currY = e.clientY;

    newPosY = currY - offsetY;
    newPosX = currX - offsetX;

    if (newPosY < 0) postIt.style.top = 0;
    else if (newPosY > maxY - postItHeight)
      postIt.style.top = maxY - postItHeight + "px";
    else postIt.style.top = newPosY + "px";

    if (newPosX < 0) postIt.style.left = 0;
    else if (newPosX > maxX - postItWidth)
      postIt.style.left = maxX - postItWidth + "px";
    else postIt.style.left = newPosX + "px";
  }

  function mouseUp(e) {
    postIt.style.boxShadow = "2px 2px 5px black";

    document.removeEventListener("mousemove", mouseDrag);
    document.removeEventListener("mouseup", mouseUp);
  }
}

// where this boy go???
function deleteWrapper() {
  deleteElement(focusedPostIt);
}
function duplicateWrapper() {
  create(focusedPostIt, true);
}
menu.querySelector("#context-delete").addEventListener("click", deleteWrapper);
menu
  .querySelector("#context-duplicate")
  .addEventListener("click", duplicateWrapper);

export { dragElement, deleteElement, rightClickElement };
