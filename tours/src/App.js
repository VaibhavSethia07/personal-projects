import React, { useState, useEffect } from "react";
import Tours from "./Tours";
import "./App.css";

function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [startFetching, setStartFetching] = useState(true);
  const URL = "https://course-api.com/react-tours-project";

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => {
      return tour.id !== id;
    });
    setTours(newTours);
  };

  useEffect(() => {
    fetch(URL)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json();
        } else {
          setIsError(true);
        }
      })
      .then((data) => {
        setTours(data);
        setStartFetching(false);
        setIsLoading(false);
      })
      .catch((err) => {
        return new Error(err);
      });
  }, [startFetching]);

  if (isLoading) {
    return (
      <main>
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <div className="error">
          <h1>Error...</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      {tours.length ? (
        <section>
          <div className="title">
            <h1>Our Tours</h1>
            <div className="underline"></div>
          </div>
          <Tours tours={tours} removeTour={removeTour}></Tours>
        </section>
      ) : (
        <div className="title">
          <h1>No Tours Left</h1>
          <button
            type="button"
            className="btn"
            onClick={() => setStartFetching(true)}
          >
            Refresh
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
