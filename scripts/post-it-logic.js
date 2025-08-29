let order = 0;
dragElement("p");

function rightClickElement(event) {
  event.preventDefault();

  let menu = document.getElementById("contextMenu");

  document.onclick = hideMenu;

  function hideMenu() {
    menu.hidden = true;
  }

  menu.hidden = false;
  menu.style.left = event.clientX + "px";
  menu.style.top = event.clientY + "px";
}

function deleteElement(event) {
  event.target.parentElement.parentElement.remove();
}

function dragElement(post_it_id) {
  const moveableArea = document.getElementById("moveable-area");
  const moveableRect = moveableArea.getBoundingClientRect();

  let post_it = document.getElementById(post_it_id);

  let postItHeader = post_it.querySelector(".post-it-header");
  const postItRect = post_it.getBoundingClientRect();

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

    offsetX = e.clientX - parseInt(post_it.style.left || 0);
    offsetY = e.clientY - parseInt(post_it.style.top || 0);

    post_it.style.zIndex = "" + order++;

    document.addEventListener("mousemove", mouseDrag);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseDrag(e) {
    e.preventDefault();

    post_it.style.boxShadow = "10px 10px 10px black";

    currX = e.clientX;
    currY = e.clientY;

    newPosY = currY - offsetY;
    newPosX = currX - offsetX;

    if (newPosY < 0) post_it.style.top = 0;
    else if (newPosY > maxY - postItHeight)
      post_it.style.top = maxY - postItHeight + "px";
    else post_it.style.top = newPosY + "px";

    if (newPosX < 0) post_it.style.left = 0;
    else if (newPosX > maxX - postItWidth)
      post_it.style.left = maxX - postItWidth + "px";
    else post_it.style.left = newPosX + "px";
  }

  function mouseUp(e) {
    post_it.style.boxShadow = "2px 2px 5px black";

    document.removeEventListener("mousemove", mouseDrag);
    document.removeEventListener("mouseup", mouseUp);
  }
}

export { dragElement, deleteElement, rightClickElement };
