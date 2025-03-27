import React from "react";
import {styles} from "@/app/uikit/input/input.styles";

interface TodoInputProps {
    newTodo: string;
    setNewTodo: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<TodoInputProps> = ({ newTodo, setNewTodo }) => {
    return (
        <div className="flex space-x-2 w-full">
            <input
                type="text"
                placeholder="New task description..."
                //className="flex-1 bg-gray-200 rounded-md text-gray-700 p-2 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                className={styles.input()}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
        </div>
    );
};

export default Input;
