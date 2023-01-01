import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./Components/List";
import Alert from "./Components/Alert";

const getLocalStorage = () => {
  let items = localStorage.getItem("items");
  if (items) {
    return (items = JSON.parse(localStorage.getItem("items")));
  } else {
    return [];
  }
};

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      showAlert(true, "red", "please enter value");
    } else if (input && isEditing) {
      setItems(
        items.map((item) => {
          if (item.id === editID) {
            return { ...item, text: input };
          }
          return item;
        })
      );
      setInput("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "lightgreen", "value changed");
    } else {
      const addItem = { id: Math.floor(Math.random() * 999), text: input };
      showAlert(true, "lightgreen", "item added to the list");
      setItems([...items, addItem]);
      setInput("");
    }
  };

  const deleteItems = (id) => {
    const deleteItemId = items.filter((item) => item.id !== id);
    setItems(deleteItemId);
    showAlert(true, "red", "item removed");
  };

  const editItem = (id) => {
    const editItemId = items.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setInput(editItemId.text);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ type, msg, show });
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="app">
      <div className="app__container">
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button disabled={!input}>{isEditing ? "edit" : "submit"}</button>
        </form>

        {items.map((item) => (
          <List
            item={item}
            key={item.id}
            deleteItems={deleteItems}
            editItem={editItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
