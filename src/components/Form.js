import React from "react";
import "./Form.css";
import Tasks from "./Tasks";
import axios from "axios";
import { useState, useEffect } from "react";

function Form() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      ); // Replace with your API endpoint
      setTodos(response.data); // Update the state with the fetched data
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      setError(error.message); // Handle error if API call fails
      setIsLoading(false); // Set loading state to false
    }
  };

  // Use useEffect to trigger the API call when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle Submit 
  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataFromEvent = new FormData(event.target);
    const userId = formDataFromEvent.get('userId');
    const title = formDataFromEvent.get('title');
    const newTodo = {
        "userId": userId,
        "id": todos.length + 1,
        "title": title,
        "completed": false
      }
    setTodos([newTodo, ...todos]);
  };

  // Deleting the Todo
  function handleDelete(todoId) {
    const updateTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updateTodos);
  }

  return (
    <div>
      <header>
        <h1>To Do List</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="UserId" className="todo-input" name="userId" />
        <br/>
        <input type="text" placeholder="Title" className="todo-input" name="title" />
        <button className="todo-button" type="submit">
          <i className="fa-sharp fa-solid fa-plus"></i>
        </button>
      </form>
      <Tasks todos = {todos} handleDelete={handleDelete} />
    </div>
  );
}

export default Form;
