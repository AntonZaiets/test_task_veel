import React from "react";
import {styles} from "@/app/uikit/input/input.styles";
import {ITodoInputProps} from "@/types";



const Input: React.FC<ITodoInputProps> = ({ newTodo, setNewTodo }) => {
    return (
        <div className="flex space-x-2 w-full">
            <input
                type="text"
                placeholder="New task description..."
                className={styles.input()}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
        </div>
    );
};

export default Input;
