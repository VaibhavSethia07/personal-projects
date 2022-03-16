import { useState } from "react";
import ParagraphList from "./ParagraphList";
import data from "./data";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  let amount = 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    amount = parseInt(count);
    if (amount < 0) {
      amount = 1;
    } else if (amount > data.length) amount = data.length;
    setParagraphs(data.slice(0, amount));
  };
  return (
    <main className="section-center">
      <h2 className="title">tired of boring lorem ipsum?</h2>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <div className="control-form">
          <label htmlFor="count">Paragraphs:</label>
          <input
            type="number"
            id="count"
            name="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          generate
        </button>
      </form>
      <ParagraphList paragraphs={paragraphs} />
    </main>
  );
}

export default App;
