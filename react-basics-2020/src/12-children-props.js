import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const firstBook = {
  title: "Gita & Vedic Wisdom: Greatest Spiritual Wisdoms",
  author: "Pranay",
  img: "https://m.media-amazon.com/images/I/81NhSeATsNL._AC_UY327_FMwebp_QL65_.jpg",
};

const secondBook = {
  title: "Hope Behind Bars: Notes from Indian Prisons",
  author: "Sanjoy Hazarika",
  img: "https://images-na.ssl-images-amazon.com/images/I/41FIdMzjGUL._SX324_BO1,204,203,200_.jpg",
};

const BookList = () => {
  return (
    /*Children Props- These are everything that we render in the opening and closing tags of the component.The name of
      children props cannot be changed. The children props is present inside the props */
    <section className="booklist">
      <Book
        title={firstBook.title}
        author={firstBook.author}
        img={firstBook.img}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Book>
      <Book
        title={secondBook.title}
        author={secondBook.author}
        img={secondBook.img}
      />
    </section>
  );
};

const Book = (props) => {
  const { img, title, author, children } = props;
  return (
    <article className="book">
      <img src={img} alt=""></img>
      <h1>{title}</h1>
      <h4>{author.toUpperCase()}</h4>
      {children}
    </article>
  );
};

ReactDOM.render(<BookList />, document.getElementById("root"));
