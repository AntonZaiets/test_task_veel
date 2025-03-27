import React from "react";
import { ButtonProps } from "@/app/uikit/button/config/button.types";
import { styles } from './button.styles'
const Button: React.FC<ButtonProps> = ({ text, onClick, color , pending}) => {
    return (
        <button
            /*className={`bg-${color}-400 text-white px-4 py-2 rounded transition-all ease-in-out duration-400 hover:bg-${color}-600 cursor-pointer`}*/
            className={styles.button(color, pending)}
            onClick={onClick}
            disabled={pending}
        >
            {text}
        </button>
    );
};

export default Button;
