import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    color: string;
}

const TodoButton: React.FC<ButtonProps> = ({ text, onClick, color }) => {
    return (
        <button
            className={`bg-${color}-400 text-white px-4 py-2 rounded transition-all ease-in-out duration-400 hover:bg-${color}-600`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default TodoButton;
