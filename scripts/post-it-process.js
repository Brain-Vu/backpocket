document
  .getElementById("allposts")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // stops automatic reloading

    const formData = new FormData(this);
    const post1 = formData.get("post1");
    const post2 = formData.get("post2");

    const posts = [];
    posts.push(post1, post2);
    logTs(posts);
  });

function logTs(posts) {
  for (const t of posts) {
    console.log(t);
  }
}
