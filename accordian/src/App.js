import "./App.css";
import questions from "./data";
import Question from "./Question";

function App() {
  return (
    <main>
      <div className="container">
        <header>
          <h3 className="title">Questions and Answers About Login</h3>
        </header>
        <section className="faqs">
          {questions.map((question) => {
            return <Question key={question.id} {...question} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
