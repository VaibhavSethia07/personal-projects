import React from "react";
import ReactDOM from "react-dom";

/*This function is called Statelss Function Component or Dump Component. The strict rule about these fuctions is that they
  always have to return HTML (JSX). Even empty HTML works.
  
  Essentially we return JSX. This HTML is just to help us.*/
function Greeting() {
  return <h4>Hi! I'm Vaibhav and this is my first component:)</h4>;
}

// JSX example
const GreetingWithJSX = () => {
  /*React.createElement() takes 3 things
    1st argument- What element we are looking for
    2nd argument- Props object
    3rd argument- Children content
  */
  return React.createElement("h1", {}, "Hello World");
};

// Using JSX while returning reduces code readability
const GreetingWithNestedJSX = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Hello World")
  );
};

// Better approach
const GreetingNested = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

/*Note: If you are writing opening and closing tags in different line then surround the return data in (), otherwise it
  will give error .
*/

ReactDOM.render(<Greeting />, document.getElementById("root"));
ReactDOM.render(<GreetingWithJSX />, document.getElementById("root"));
ReactDOM.render(<GreetingWithNestedJSX />, document.getElementById("root"));
ReactDOM.render(<GreetingNested />, document.getElementById("root"));
