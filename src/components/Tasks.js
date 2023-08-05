import React from "react";
import "./Form.css";

function Tasks({todos, handleDelete}) {
  return (
    <div>
    {todos.map((todo) => (
      <div key={todo.id} className="todo-container">
        <ul className="todo-list">
          <div className="todo">
            <li className="todo-item">{todo.title}</li>
            <button
              onClick={() => handleDelete(todo.id)}
              className="trash-btn"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </ul>
      </div>
    ))}
    </div>
  );
}

export default Tasks;
