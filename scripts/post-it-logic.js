let order = 0;
let focusedPostIt;

let connectedPosts = new Set();

function setActivated(postIt, turnOn) {
  let postItHeaderState = postIt
    .querySelector(".post-it-header")
    .querySelector(".post-it-header-state");
  if (turnOn) {
    postItHeaderState.classList.add("selected");
    postItHeaderState.innerText = "O";
  } else {
    postItHeaderState.classList.remove("selected");
    postItHeaderState.innerText = "x";
  }
}

function getFocusedPostIt() {
  return focusedPostIt;
}

function deleteElement(postIt) {
  if (connectedPosts.has(postIt)) connectedPosts.delete(postIt);
  // gotta remove the insight thing (specifically need to remove the connection as well)
  postIt.remove();
}

function rightClickElement(event) {
  event.preventDefault();

  focusedPostIt = event.target.closest(".post-it");

  console.log(focusedPostIt);
  let menu = document.getElementById("contextMenu");

  document.onclick = () => {
    menu.hidden = true;
  };

  menu.hidden = false;
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";
}

function dragElement(postIt) {
  let postItHeader = postIt.querySelector(".post-it-header");
  const moveableArea = document.getElementById("moveable-area");

  let currX = 0,
    currY = 0,
    offsetX = 0,
    offsetY = 0,
    newPosX = 0,
    newPosY = 0,
    maxX = 0,
    maxY = 0,
    postItWidth,
    postItHeight,
    moveableRect,
    postItRect,
    headerRect;

  postItHeader.addEventListener("mousedown", mouseDown);

  function mouseDown(event) {
    event.preventDefault();
    postItRect = postIt.getBoundingClientRect();
    moveableRect = moveableArea.getBoundingClientRect();
    postItWidth = postItRect.width;
    postItHeight = postItRect.height;
    
    
    maxX = moveableRect.width;
    maxY = moveableRect.height;

    currX = event.clientX;
    currY = event.clientY;

    offsetX = event.clientX - parseInt(postIt.style.left || 0);
    offsetY = event.clientY - parseInt(postIt.style.top || 0);

    postIt.style.zIndex = "" + order++;

    document.addEventListener("mousemove", mouseDrag);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseDrag(event) {
    event.preventDefault();
    
    postIt.classList.add("dragged");

    currX = event.clientX;
    currY = event.clientY;

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

  function mouseUp() {
    postIt.classList.remove("dragged");
    document.removeEventListener("mousemove", mouseDrag);
    document.removeEventListener("mouseup", mouseUp);
  }
}

export {
  dragElement,
  deleteElement,
  rightClickElement,
  getFocusedPostIt,
  setActivated,
};
