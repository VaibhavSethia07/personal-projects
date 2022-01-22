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
window.getPosts = function getPosts() {
    setTimeout(() => {
        let output = ``;
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        })
        ulEl.innerHTML = output;
    }, 1000);
}

window.createPost = function creatPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            // Here we do some kind of error checking
            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error: Something went wrong!');
            }
        }, 2000);
    });
}

// createPost({ title: "Post Three", body: "This is post three" })
//     .then(getPosts)
//     .catch(err => console.log(err));

// If we have multiple promises then instead of using .then() for every promise
// we can use promise.all()

const promise1 = Promise.resolve("Hello World");
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Goodbye');
})

Promise.all([promise1, promise2, promise3]).then(
    (values) => {
        console.log(values);
    }
);
