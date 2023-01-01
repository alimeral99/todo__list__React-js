import React from "react";
import "./List.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ item, deleteItems, editItem }) {
  return (
    <div className="List">
      <p className="List__text">{item.text}</p>
      <button>
        <FaEdit onClick={() => editItem(item.id)} className="edit__Icon Icon" />
      </button>
      <button>
        <FaTrash
          onClick={() => deleteItems(item.id)}
          className="delete__Icon Icon"
        />
      </button>
    </div>
  );
}

export default List;
