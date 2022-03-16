const posts = [
  {
    title: "Post One",
    body: "This is post one",
  },
  {
    title: "Post Two",
    body: "This is post two",
  },
];

const ulEl = document.getElementById("ul-el");

window.getPosts = function getPosts() {
  setTimeout(() => {
    let output = ``;
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    ulEl.innerHTML = output;
  }, 1000);
};

window.createPost = function createPost(post) {
  setTimeout(() => {
    posts.push(post);
  }, 2000);
};

// If we have to use await inside the function then the function has to be declared as async
window.init = async function init() {
  await createPost({ title: "Post Three", body: "This is post three" });

  // So we are waiting for createPost to be done and then we move on to getPosts()
  getPosts();
};

init();
