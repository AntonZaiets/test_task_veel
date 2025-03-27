import React from "react";
import TodoButton from "@/app/uikit/button";

interface TodoItemProps {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
    onDelete: (id: number) => void;
    pending: boolean;
    text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, pending, text }) => {
    return (
        <div
            key={todo.id}
            className={`min-w-[200px] w-[calc(100%/5-1rem)] p-4 flex flex-col place-content-between rounded-md ${
                todo.completed ? "bg-emerald-200" : "bg-sky-200"
            }`}
        >
            <span className="text-gray-700 break-words">{todo.title}</span>
            <TodoButton onClick={() => onDelete(todo.id)} text={pending ? 'Pending...' : 'Delete'} color="red" pending={pending}/>
        </div>
    );
};

export default TodoItem;
