import React from "react";
import ReactDOM from "react-dom";

// Importing CSS
// In the above code the JavaScript was importing something but here we are grabbing everything
import "./index.css";

const BookList = () => {
  return (
    <section className="booklist">
      <Book />
      <Book />
    </section>
  );
};

const Book = () => {
  return (
    <article className="book">
      <Image />
      <Title />
      <Author />
    </article>
  );
};

const Title = () => {
  //We can add the CSS styles in the tag as well. We can access the JavaScript world in the JSX only inside the {}
  /*Inside the {} we pass in the object using the nested {}. In JavaScript we provide the key:value pair. The value must
    always be string*/
  /* Note that when we set the CSS this way, it is set as inline. So it overwrites the same property in the CSS file. Other
  properties remained same.
  Prefer using the separate CSS.
  */
  return (
    <h4 style={{ color: "#617d98", fontSize: "0.75rem", marginTop: "0.25rem" }}>
      Gita & Vedic Wisdom: Greatest Spiritual Wisdom
    </h4>
  );
};

const Author = () => {
  return <h5>by Pranay</h5>;
};

const Image = () => {
  return (
    <img
      src="https://m.media-amazon.com/images/I/81NhSeATsNL._AC_UY327_FMwebp_QL65_.jpg"
      alt=""
    ></img>
  );
};

ReactDOM.render(<BookList />, document.getElementById("root"));
