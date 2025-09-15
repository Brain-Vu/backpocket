let numLines = 0;

function Connection(p1, p2, li, ha) {
  this.post1 = p1;
  this.post2 = p2;
  this.line = li;
  this.handler = ha;
}

const connections = new Map(); // map of a connection name to the related post-its, line, and handler involved

// connection name is the combo of the post IDs, no overlapping, duplicate connections

// checks if a connection name contains a particular post-it


// checks for a connection between two post-its
function hasConnection(post1, post2) {
  let nameV1 = post1.id + post2.id; // checks for both possible version of the name
  let nameV2 = post2.id + post1.id;
  return connections.has(nameV1) || connections.has(nameV2);
}

// gets the connection name that actually exists in connections (as only one should exist)
function getConnectionName(post1, post2) {
  let nameV1 = post1.id + post2.id;
  let nameV2 = post2.id + post1.id;
  if (connections.has(nameV1)) return nameV1;
  else if (connections.has(nameV2)) return nameV2;
  else console.log("Could not get a name, connection does not exist");
}

// deletes a connection
function deleteConnection(post1, post2) {
  if (!hasConnection(post1, post2)) {
    console.log("No deletion, connection did not exist");
  } else {
    // getting the proper connection
    const name = getConnectionName(post1, post2);
    const connection = connections.get(name);

    // removing event listeners based on the saved handler
    post1.removeEventListener("mousemove", connection.handler);
    post2.removeEventListener("mousemove", connection.handler);

    // removing line from DOM
    connection.line.remove();

    // removing from connections map
    connections.delete(name);
  }
}

// creates a new connection and line between two post-its
function addConnection(post1, post2) {
  const name = post1.id + post2.id;

  // creating line on DOM
  let line = makeLine();

  updatePosition(post1, post2, line); // to make line initially appear

  // creating the handler and adding event listeners
  const handler = () => {
    updatePosition(post1, post2, line);
  };
  post1.addEventListener("mousemove", handler);
  post2.addEventListener("mousemove", handler);

  // adding to connections map
  const newConnection = new Connection(post1, post2, line, handler);
  connections.set(name, newConnection);

  console.log(connections);
}

// creates a new line on the DOM
function makeLine() {
  let line = document.getElementById("l").cloneNode(true);
  line.id = "l" + numLines++;
  line.hidden = false;
  document.getElementById("connections").querySelector("svg").appendChild(line);
  return line;
}

// used to update the position of a line
function updatePosition(post1, post2, line) {
  let width = document.getElementById("p0").getBoundingClientRect().width; // used to make line point to half width of post-it

  line.setAttribute("x1", parseInt(post1.style.left || 0) + width / 2);
  line.setAttribute("y1", parseInt(post1.style.top || 0) + 10);

  line.setAttribute("x2", parseInt(post2.style.left || 0) + width / 2);
  line.setAttribute("y2", parseInt(post2.style.top || 0) + 10);
}

export { addConnection, deleteConnection };
