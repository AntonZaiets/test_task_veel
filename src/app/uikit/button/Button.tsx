import React from "react";
import { ButtonProps } from "@/app/uikit/button/config/button.types";
import { styles } from './button.styles'
const Button: React.FC<ButtonProps> = ({ text, onClick, color , pending}) => {
    return (
        <button
            className={styles.button(color, pending)}
            onClick={onClick}
            disabled={pending}
        >
            {text}
        </button>
    );
};

export default Button;
