import {TColors} from "@/types";

export interface ButtonProps {
    text: string;
    onClick: () => void;
    color: TColors;
    pending: boolean;
}
