"use client";

import {useTodos} from "@/app/hooks/useTodos";
import Input from "@/app/uikit/input/Input";
import Button from "@/app/uikit/button/Button";
import Task from "@/app/components/Task";
import {useTodoManagement} from "@/app/hooks/useTodoManagement";
import {Loader} from "@/app/uikit/loader/Loader";

export default function TodoListApp() {
    const { data, isLoading, isError} = useTodos();
    const { newTodo, setNewTodo, handleTodoAdd, deleteTodo, deletePending, addPending } = useTodoManagement();
    if (isLoading) return <Loader loading={true} />;
    if (isError) return <p>Error loading data</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md space-y-4 h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-center text-gray-700">Todo List</h1>
            <div className="flex space-x-2">
                <Input newTodo={newTodo} setNewTodo={setNewTodo} />
                <Button onClick={handleTodoAdd} text={addPending ? 'Pending...' : 'Add'} color={'blue'} pending={addPending}/>
            </div>
            <div className="flex overflow-y-auto justify-center w-full">
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {data?.map((todo) => (
                        <Task key={todo.id} todo={todo} onDelete={deleteTodo} pending={deletePending} id={todo.id} title={todo.title} completed={todo.completed}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
