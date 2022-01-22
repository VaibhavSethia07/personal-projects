const posts = [
    {
        title: "Post One",
        body: "This is post one"
    },
    {
        title: "Post Two",
        body: "This is post two"
    }
];

const ulEl = document.getElementById("ul-el");

// Here we are using setTimeout() to mimic server response with delay
window.getPosts = function getPosts() {
    setTimeout(() => {
        let output = ``;
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        })
        ulEl.innerHTML = output;
    }, 1000);
}

window.createPost = function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);

}
// If we call getPosts() independently then it will display 2 posts only because within 1sec 3rd post would have not been pushed to posts array
// So we use callback function
createPost({ title: "Post Three", body: "This is post three" }, getPosts);
