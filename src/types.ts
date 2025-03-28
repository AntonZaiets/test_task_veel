import React from "react";

export type TColors = | "blue" | "red";

export interface ITaskProps {
    id: number;
    title: string;
    completed: boolean;
}

export interface ITodo {
    id: any;
    userId: number,
    title: string;
    completed: boolean;
}

export interface IButtonProps {
    text: string;
    onClick: () => void;
    color: TColors;
    pending: boolean;
}

export interface ITodoInputProps {
    newTodo: string;
    setNewTodo: React.Dispatch<React.SetStateAction<string>>;
}

export interface ILoaderProps{
    loading: boolean;
}