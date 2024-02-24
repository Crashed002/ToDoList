import React, { useState } from "react";
import "./Style.css"; // Importing CSS file for styling

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const add = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        // date to get the unique key
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      // baed ma tzid data tafragh el input field w el value yarja feragh
      setInputValue("");
    }
  };

  const done = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        // baed maykamel el logic yraja yhot el data fwost el todo state
        return todo;
      })
    );
  };

  const del = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    // tbadel fi el state mta el todo haseb el condition mta e state filter
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="todo-app">
        <h1>Todo App</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Enter your todo..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button className="add-btn" onClick={add}>
            Add
          </button>
        </div>
        <div className="filter">
          {/* lena tbadel fi elstate filter */}
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Pending..
          </button>
        </div>
        <ul className="list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <span className="text">{todo.text}</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  className={todo.completed ? "undo-btn" : "complete-btn"}
                  onClick={() => done(todo.id)}
                >
                  {todo.completed ? "Undo" : "Done"}
                </button>
                <button className="delete-btn" onClick={() => del(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
