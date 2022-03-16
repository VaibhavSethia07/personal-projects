import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const title = "Gita & Vedic Wisdom: Greatest Spiritual Wisdoms";
const author = "Pranay";
const img =
  "https://m.media-amazon.com/images/I/81NhSeATsNL._AC_UY327_FMwebp_QL65_.jpg";

const BookList = () => {
  return (
    //  All the arugments written are in JSX, so we use {} to go in the JavaScript
    <section className="booklist">
      {/* <Book job="developer" />
      <Book title="random-title" number={22} /> */}
      <Book title={title} author={author} img={img} />
    </section>
  );
};

/*Book is a function and function has parameters and arguments. So if we pass in name, we can use the name in the function.
The convention is to write `props` for the parameter list. `props` stand for properties */

// We can even destructure the props in the paramter list as well. So instead of (props)=>{} we can have ({img, title, author})=>{}
const Book = (props) => {
  console.log(props);
  console.log(props.job);
  // Use object destructuring
  const { img, title, author } = props;
  return (
    /* We use the JavaScript inside the JSX using {}. The {} should not have statements, it should have something that is
    returned*/
    <article className="book">
      <img src={img} alt=""></img>
      <h1>{title}</h1>
      <h4>{author.toUpperCase()}</h4>
    </article>
  );
};

ReactDOM.render(<BookList />, document.getElementById("root"));
