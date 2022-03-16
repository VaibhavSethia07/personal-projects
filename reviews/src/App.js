import "./App.css";
import reviews from "./data";
import Review from "./Review";
import React, { useState } from "react";

function App() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const review = reviews[(reviewIndex + reviews.length) % reviews.length];
  return (
    <main>
      <section className="container">
        <div className="title">
          <h1>Our Reviews</h1>
          <div className="underline"></div>
        </div>
        <div className="listing">
          <Review
            key={review.id}
            {...review}
            index={reviewIndex}
            setReviewIndex={setReviewIndex}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
