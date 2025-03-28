import React from "react";
import Button from "@/app/uikit/button/Button";
import {ITaskProps} from "@/types";
import {useTodoManagement} from "@/app/hooks/useTodoManagement";



const Task: React.FC<ITaskProps> = ({id, completed, title}) => {
    const {  deleteTodo, deletePending } = useTodoManagement();
    return (
        <div
            key={id}
            className={`min-w-[200px] w-[calc(100%/5-1rem)] p-4 flex flex-col justify-between rounded-md ${
                completed ? "bg-emerald-200" : "bg-sky-200"
            }`}
        >
            <span className="text-gray-700 break-words">{title}</span>
            <div className="flex flex-col">
                <span className="text-gray-400 break-words pb-2 pt-3">Status: {completed ? 'Completed' : 'In Progress'}</span>
                <Button onClick={() => deleteTodo(id)} text={'Delete'} color="red" pending={deletePending}/>
            </div>
        </div>
    );
};

export default Task;
