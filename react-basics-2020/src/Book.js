// Here we use the default export

// Use the React snippet by typing rface
import React from "react";

const clickHandler = () => {
  alert("I want to but this book");
};

const message = (title) => {
  console.log(`Title of the book is ${title}`);
};

const Book = (props) => {
  const { img, title, author, children } = props;
  return (
    <article className="book">
      <img src={img} alt=""></img>
      <h1>{title}</h1>
      <h4>{author}</h4>
      {children}

      <button type="button" onClick={() => alert("I want to buy this book")}>
        Buy Now 1
      </button>

      <button type="button" onClick={clickHandler}>
        Buy Now 2
      </button>

      {/* Passing a variable in the arrow function */}
      <button
        type="button"
        onClick={() => {
          console.log(title);
        }}
      >
        Buy Now 3
      </button>

      {/* We cannot do like this as the function will be called automatically when the application runs */}
      <button type="button" onClick={message(title)}>
        Buy Now 4
      </button>

      {/* So we wrap the function called inside the arrow function. Now this function is called on click. */}
      <button
        type="button"
        onClick={() => {
          message(title);
        }}
      >
        Buy Now 5
      </button>
    </article>
  );
};

// We can have only 1 default export per file
export default Book;
