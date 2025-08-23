let postIt = document.getElementById("fred");
let postItHeader = document.getElementById("beth");
let moveableArea = document.getElementById("moveable-area");

const postItRect = postIt.getBoundingClientRect();
const postItHeaderRect = postItHeader.getBoundingClientRect();
const moveableRect = moveableArea.getBoundingClientRect();

dragElement(postIt);

function dragElement(element) {
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

    offsetX = e.clientX - parseInt(element.style.left || 0);
    offsetY = e.clientY - parseInt(element.style.top || 0);

    document.addEventListener("mousemove", mouseDrag);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseDrag(e) {
    e.preventDefault();

    currX = e.clientX;
    currY = e.clientY;

    newPosY = currY - offsetY;
    newPosX = currX - offsetX;

    if (newPosY < 0) element.style.top = 0;
    else if (newPosY > maxY - postItHeight)
      element.style.top = maxY - postItHeight + "px";
    else element.style.top = newPosY + "px";

    if (newPosX < 0) element.style.left = 0;
    else if (newPosX > maxX - postItWidth)
      element.style.left = maxX - postItWidth + "px";
    else element.style.left = newPosX + "px";
  }

  function mouseUp(e) {
    document.removeEventListener("mousemove", mouseDrag);
    document.removeEventListener("mouseup", mouseUp);
  }
}
