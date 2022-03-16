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
    <section className="booklist">
      <Book
        title={firstBook.title}
        author={firstBook.author}
        img={firstBook.img}
      />
      <Book
        title={secondBook.title}
        author={secondBook.author}
        img={secondBook.img}
      />
    </section>
  );
};

const Book = (props) => {
  const { img, title, author } = props;
  return (
    <article className="book">
      <img src={img} alt=""></img>
      <h1>{title}</h1>
      <h4>{author.toUpperCase()}</h4>
    </article>
  );
};

ReactDOM.render(<BookList />, document.getElementById("root"));
