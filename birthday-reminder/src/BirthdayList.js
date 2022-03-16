import React, { useState } from "react";
import { data } from "./people";

const BirthdayList = () => {
  const [people, setPeople] = useState(data);
  const handleClick = () => {
    setPeople([]);
  };
  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        {people.map((person) => {
          const { id, name, image, age } = person;
          return (
            <div key={id} className="person">
              <img src={image} alt={name}></img>
              <div>
                <h4> {name}</h4>
                <p>{age} years</p>
              </div>
            </div>
          );
        })}
        <button type="button" onClick={() => handleClick()}>
          Clear All
        </button>
      </section>
    </main>
  );
};

export default BirthdayList;
