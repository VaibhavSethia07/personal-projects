import { useState } from "react";
import Alert from "./Alert";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState("");
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const showAlert = (show = "false", type, msg) => {
    setAlert({ show, type, msg });
  };

  const addItem = (e) => {
    e.preventDefault();

    if (!item) {
      showAlert(true, "danger", "please enter value");
    } else if (alert.type === "value changed") {
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
    }

    if (isUpdate) {
      items[updateIndex] = item;
      setUpdateIndex("");
      setIsUpdate(false);
    } else {
      setItems([...items, item]);
      setItem("");
    }
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    const newItems = items.filter((item, index) => index !== id);
    setItems(newItems);
  };

  const updateItem = (id) => {
    setItem(items[id]);
    setUpdateIndex(id);
    setIsUpdate(true);
  };

  const clearItems = () => {
    showAlert(true, "danger", "empty list");
    setItems([]);
  };

  return (
    <section className="section-center">
      <h3>Grocery Bud</h3>
      <form className="grocery-form" onSubmit={addItem}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={items} />
        )}
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={item}
            placeholder="e.g. eggs"
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>

      <div className="grocery-list">
        {items.map((item, index) => {
          return (
            <article className="grocery-item" key={index}>
              <p className="title">{item}</p>
              <div class="btn-container">
                <button className="edit-btn" onClick={() => updateItem(index)}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                  </svg>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(index)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                  </svg>
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <button className="clear-btn" onClick={clearItems}>
        clear items
      </button>
    </section>
  );
}

export default App;
