import React from "react";
import ReactDOM from "react-dom";

// JSX Rules

//  1. Use single element- Always return a single element from the component
const Greeting1 = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        <li>
          <a href="#">Homepage</a>
        </li>
        <li>
          <a href="#">Life</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
      </ul>
    </div>
  );
};

/* 2. div/ section/ article/ fragment- Follow HTML semantics. Use div tag wherever necessary. You can also use section and
article tags. Also instead of enclosing everything in div tag we can enclose it in React.Fragment tag. Shortcut for React.
Fragment tag is <></>*/
const Greeting2 = () => {
  return (
    <React.Fragment>
      <section>
        <h1>Hello World</h1>
      </section>
      <div>
        <ul>
          <li>
            <a href="#">Homepage</a>
          </li>
          <li>
            <a href="#">Life</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

// 3. camelCase HTML attributes- For eg, onClick
const Greeting3 = () => <button onClick="#">Say Hi!</button>;

/* 4. Use className instead of class for HTML attrinutes- In ES6 `class` is a keyword. So to avoid naming conflict use
`className` for the HTML `class` attribute. Otherwise error would appear in browser's console*/
const Greeting4 = () => <div className="greet">Hey! everyone</div>;

// 5. Close every tag, even when closing tag is not required

// 6. Put the return data into () when you keep the opening and closing tag in different lines.

ReactDOM.render(<Greeting1 />, document.getElementById("root"));
ReactDOM.render(<Greeting2 />, document.getElementById("root"));
ReactDOM.render(<Greeting3 />, document.getElementById("root"));
ReactDOM.render(<Greeting4 />, document.getElementById("root"));
