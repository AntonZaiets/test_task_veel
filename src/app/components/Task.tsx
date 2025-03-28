import React from "react";
import Button from "@/app/uikit/button/Button";

interface TaskProps {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
    onDelete: (id: number) => void;
    pending: boolean;
}

const Task: React.FC<TaskProps> = ({ todo, onDelete, pending }) => {
    return (
        <div
            key={todo.id}
            className={`min-w-[200px] w-[calc(100%/5-1rem)] p-4 flex flex-col justify-between rounded-md ${
                todo.completed ? "bg-emerald-200" : "bg-sky-200"
            }`}
        >
            <span className="text-gray-700 break-words">{todo.title}</span>
            <div className="flex flex-col">
                <span className="text-gray-400 break-words pb-2 pt-3">Status: {todo.completed ? 'Completed' : 'In Progress'}</span>
                <Button onClick={() => onDelete(todo.id)} text={'Delete'} color="red" pending={pending}/>
            </div>
        </div>
    );
};

export default Task;
