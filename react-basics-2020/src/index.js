import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { books } from "./books";
import Book from "./Book";

const BookList = () => {
  return (
    <section className="booklist">
      {books.map((book, index) => {
        return <Book {...book} />;
      })}
    </section>
  );
};

ReactDOM.render(<BookList />, document.getElementById("root"));
