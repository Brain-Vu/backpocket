
let element = document.getElementById("c");

function updatePosition(event) {
  element.setAttribute("x1", event.clientX);
  element.setAttribute("y1", event.clientY);
  
  element.setAttribute("x2", "50px");
  element.setAttribute("y2", "50px");
}

  console.log(element.getAttribute("x1"));
let postIt = document.getElementById("p0");
postIt.addEventListener("mousemove", updatePosition);