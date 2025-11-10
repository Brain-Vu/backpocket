let postItWidth = 145; // used to make line point to half width of post-it
let adviceWidth = 72;
let numLines = 0;

function Connection(p1, p2, li, ha) {
  this.post1 = p1;
  this.post2 = p2;
  this.line = li;
  this.handler = ha;
}

const connections = new Map(); // map of a connection name to the two related post-its, line, and handler involved
const postItRelations = new Map(); // map of a post-it to a set of its related post its

// connection name is the combo of the post IDs, no overlapping, duplicate connections

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
  if (!hasConnection(post1, post2))
    console.log("No deletion, connection did not exist");
  else {
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

// deletes all connections related to a post-it that is marked for deletion
function deleteRelated(postIt) {
  if (postItRelations.has(postIt)) {
    const relationArr = [...postItRelations.get(postIt)];

    for (let p of relationArr) {
      deleteConnection(postIt, p);
      postItRelations.get(p).delete(postIt);
    }

    postItRelations.delete(postIt);
  } else console.log("Could not delete post-it!");
}

// creates a new connection and line between two post-its
function addConnection(post1, post2) {
  if (!hasConnection(post1, post2)) {
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

    // adding to postItRelations map
    if (postItRelations.has(post1)) postItRelations.get(post1).add(post2);
    else postItRelations.set(post1, new Set([post2]));
    if (postItRelations.has(post2)) postItRelations.get(post2).add(post1);
    else postItRelations.set(post2, new Set([post1]));
  }
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
  let x1 = parseInt(post1.style.left || 0) + postItWidth / 2,
    y1 = parseInt(post1.style.top || 0) + 10,
    x2 = parseInt(post2.style.left || 0) + postItWidth / 2,
    y2 = parseInt(post2.style.top || 0) + 10;

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  let f = document.getElementById("b");
  console.log(f.style.top);
  f.style.top = (y1+y2)/2 + "px";
  f.style.left = (x1+x2)/2 - (adviceWidth/2) + "px";
}

export { addConnection, deleteRelated };
