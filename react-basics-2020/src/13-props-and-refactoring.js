import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
// We add the `key` field to all the objects, because React gives a warning in console 'Each child in a list should have a
// unique `key` prop
const books = [
  {
    // The key helps React to keep track of every object. Most of the time the data that we get will have the Id
    key: 1,
    title: "Gita & Vedic Wisdom: Greatest Spiritual Wisdoms",
    author: "Pranay",
    img: "https://m.media-amazon.com/images/I/81NhSeATsNL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    key: 2,
    title: "Hope Behind Bars: Notes from Indian Prisons",
    author: "Sanjoy Hazarika",
    img: "https://images-na.ssl-images-amazon.com/images/I/41FIdMzjGUL._SX324_BO1,204,203,200_.jpg",
  },
];

const BookList1 = () => {
  // We can render arrays in React but the array cannot be of objects
  return (
    <section className="booklist">
      {books.map((book, index) => {
        // We can take out the properties of every book and pass it as paramter
        return (
          <Book
            key={book.key}
            img={book.img}
            title={book.title}
            author={book.author}
          />
        );
      })}
    </section>
  );
};

const BookList2 = () => {
  return (
    <section className="booklist">
      {books.map((book, index) => {
        // Or we can destructure the book object
        const { key, img, title, author } = book;
        return <Book key={key} img={img} title={title} author={author} />;
      })}
    </section>
  );
};

const BookList3 = () => {
  return (
    <section className="booklist">
      {books.map((book, index) => {
        // Or We can use spread operator to extract all the properties of Book. This is preferred more in industry
        return <Book {...book} />;
      })}
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

ReactDOM.render(<BookList1 />, document.getElementById("root"));
ReactDOM.render(<BookList2 />, document.getElementById("root"));
ReactDOM.render(<BookList3 />, document.getElementById("root"));
