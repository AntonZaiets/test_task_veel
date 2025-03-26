"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TodoListApp () {
  type Todo = {
    id: number;
    title: string;
    completed: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      setTodos(response.data);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching todos");
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);


  const addTodo = async () => {
    try {
      const newTodoData = { title: newTodo, completed: false };
      const response = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          newTodoData
      );

      setTodos((prevTodos) => [...prevTodos, response.data as Todo]);
      setNewTodo("");
    } catch (err) {
      setError("Error adding todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Error deleting todo");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="p-6 mx-auto bg-white shadow-md space-y-4 h-screen flex flex-col">
        <h1 className="text-2xl font-bold text-center text-gray-700">Todo App</h1>
        <div className="flex space-x-2">
          <input
              type="text"
              className="flex-1 bg-gray-200 rounded-md text-gray-700 p-2 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded transition-all ease-in-out duration-500 hover:bg-blue-700"
              onClick={addTodo}
          >
            Add
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-wrap gap-4 justify-space-between">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className={`w-[18%] min-w-[200px] p-4 flex flex-col place-content-between rounded-md ${todo.completed ? "bg-emerald-200" : "bg-sky-200"}`}
                >
                  <div>
                    <span className="text-gray-700">{todo.title}</span>
                    <span className="text-gray-400 block text-sm">{todo.completed ? "Status: Completed" : "Status: In Progress"}</span>
                  </div>
                  <button
                      className="bg-red-400 text-white mt-10 px-2 py-1 rounded transition-all ease-in-out duration-500 hover:bg-blue-500"
                      onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </li>
            ))}
          </ul>

        </div>
      </div>
  );
}
