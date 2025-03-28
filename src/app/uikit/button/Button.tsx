import React from "react";
import { styles } from './button.styles'
import {IButtonProps} from "@/types";
const Button: React.FC<IButtonProps> = ({ text, onClick, color , pending}) => {
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
