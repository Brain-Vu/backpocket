let order = 0;
let focusedPostIt;

// returns the post-it that was right clicked
function getFocusedPostIt() {
  return focusedPostIt;
}

// removes post-it from the DOM and any related connections
function deletePostIt(postIt) {
  // gotta remove the insight thing (specifically need to remove the connection as well)
  postIt.remove();
}

// presents context menu when a post-it is right clicked
function rightClickElement(event) {
  event.preventDefault();

  // gets closest post-it
  focusedPostIt = event.target.closest(".post-it");
  let menu = document.getElementById("contextMenu");

  // sets appearance
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";
  menu.hidden = false;

  document.onclick = () => {
    menu.hidden = true;
  };
}

// sets post-it appearance when "connect" is selected in the context menu
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

// post-it dragging logic
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
    postItRect;

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
    document.removeEventListener("mousemove", mouseDrag);
    document.removeEventListener("mouseup", mouseUp);
    postIt.classList.remove("dragged");
  }
}

export {
  dragElement,
  deletePostIt,
  rightClickElement,
  getFocusedPostIt,
  setActivated,
};
