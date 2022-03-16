import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
// Since the index.js is getting cluttered, we need to break it into multiple files. This is plain JavaScript not React
// Since it is a named export we use {} and the name of the exported item and the destructured item should be same
import { books } from "./books";
/* The difference between the default export and the named export is that we can change the imported name in default export
but not in named export*/
import Book from "./Book";

// We will be using onClick and onMouseOver events
// onClick can be applied to any tag not just button

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
