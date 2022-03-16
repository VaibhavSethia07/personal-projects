import React from "react";
import ReactDOM from "react-dom";

// Putting all the components in 1 tag defeats the purpose of using React

// Nested Components
const Greeting1 = () => {
  return (
    <div>
      <Greeting2 />
      <Message />
    </div>
  );
};

/*Note: This is somewhat traditional way of setting up a react application. By convention we make 1 root component called
App and inside it we render all other components*/

const Greeting2 = () => <h4>Hey! I'm Vaibhav</h4>;
const Message = () => <p>This is my message</p>;
ReactDOM.render(<Greeting1 />, document.getElementById("root"));
