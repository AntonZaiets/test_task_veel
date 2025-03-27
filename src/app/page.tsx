"use client";

import { useState } from "react";
import { useTodos, useTodoAdd, useTodoDelete } from "@/app/hooks/useTodos";

export default function TodoListApp() {
    const [newTodo, setNewTodo] = useState("");
    const { data, isLoading, isError } = useTodos();
    const { mutate: addTodo } = useTodoAdd();
    const { mutate: deleteTodo } = useTodoDelete();

    const handleTodoAdd = () => {
        if (!newTodo.trim()) return;
        addTodo({
            userId: 1,
            id: Date.now(),
            title: newTodo,
            completed: false,
        });
        setNewTodo("");
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md space-y-4 h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-center text-gray-700">Todo List</h1>
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="New task description..."
                    className="flex-1 bg-gray-200 rounded-md text-gray-700 p-2 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded transition-all ease-in-out duration-500 hover:bg-blue-700"
                    onClick={handleTodoAdd}
                >
                    Add
                </button>
            </div>
            <div className="flex overflow-y-auto justify-center w-full">
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {data?.map((todo) => (
                        <div
                            key={todo.id}
                            className={`min-w-[200px] w-[calc(100%/5-1rem)] p-4 flex flex-col place-content-between rounded-md ${
                                todo.completed ? "bg-emerald-200" : "bg-sky-200"
                            }`}
                        >
                            <span className="text-gray-700 break-words">{todo.title}</span>
                            <button
                                className="w-full bg-red-400 text-white mt-1 px-2 py-1 rounded transition-all ease-in-out duration-500 hover:bg-red-600"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
