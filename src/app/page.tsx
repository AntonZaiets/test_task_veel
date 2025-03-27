"use client";

import {useTodos} from "@/app/hooks/useTodos";
import TodoInput from "@/app/uikit/input";
import TodoButton from "@/app/uikit/button";
import TodoItem from "@/app/components/task";
import {useTodoManagement} from "@/app/hooks/useTodoManagement";

export default function TodoListApp() {
    const { data, isLoading, isError } = useTodos();
    const { newTodo, setNewTodo, handleTodoAdd, deleteTodo } = useTodoManagement();
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md space-y-4 h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-center text-gray-700">Todo List</h1>
            <div className="flex space-x-2">
                <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} />
                <TodoButton onClick={handleTodoAdd} text={'Add'} color={'blue'}/>
            </div>
            <div className="flex overflow-y-auto justify-center w-full">
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {data?.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
