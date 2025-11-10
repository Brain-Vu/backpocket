let postItWidth = 145; // used to make line point to half width of post-it
let adviceWidth = 72;
let numLines = 0;

function Connection(p1, p2, li, ob) {
  this.post1 = p1;
  this.post2 = p2;
  this.line = li;
  this.observer = ob;
}

const connections = new Map(); // map of a connection name to the two related post-its, line, and observer involved
const postItRelations = new Map(); // map of a post-it to a set of its related post its
const lineBoxRelations = new Map(); // map relating a line to its box

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

    // disabling the observer
    connection.observer.disconnect();

    // removing box from line box map and DOM
    document.getElementById(lineBoxRelations.get(connection.line.id)).remove();
    lineBoxRelations.delete(connection.line.id);

    // removing from connections map
    connections.delete(name);

    // removing line from DOM
    connection.line.remove();
  }
}

// deletes all connections related to a post-it that is marked for deletion
function deleteRelated(postIt, setActivated) {
  if (postItRelations.has(postIt)) {
    const relationArr = [...postItRelations.get(postIt)];
    for (let p of relationArr) {
      deleteConnection(postIt, p);
      postItRelations.get(p).delete(postIt);
      if (postItRelations.get(p).size == 0) setActivated(p, false);
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
    let box = makeBox();
    lineBoxRelations.set(line.id, box.id);

    updatePosition(post1, post2, line, box); // to make line initially appear

    // using an observer to update the line whenever one of the posts move
    const observer = new MutationObserver(() => updatePosition(post1, post2, line, box));
    observer.observe(post1, { attributes: true, attributeFilter: ["style"] });
    observer.observe(post2, { attributes: true, attributeFilter: ["style"] });

    // adding to connections map
    const newConnection = new Connection(post1, post2, line, observer);
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

// create a new box on the DOM
function makeBox() {
  let box = document.getElementById("b").cloneNode(true);
  box.id = "b" + numLines++;
  box.hidden = false;
  console.log(box);
  document.getElementById("connections").appendChild(box);
  return box;
}

// used to update the position of a line
function updatePosition(post1, post2, line, box) {
  let x1 = parseInt(post1.style.left || 0) + postItWidth / 2,
    y1 = parseInt(post1.style.top || 0) + 10,
    x2 = parseInt(post2.style.left || 0) + postItWidth / 2,
    y2 = parseInt(post2.style.top || 0) + 10;

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  box.style.top = (y1 + y2) / 2 + "px";
  box.style.left = (x1 + x2) / 2 - adviceWidth / 2 + "px";
}

export { addConnection, deleteRelated };
