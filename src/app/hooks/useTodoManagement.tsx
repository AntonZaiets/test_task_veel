import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/app/types/todo.types";
import {addTodo, deleteTodo} from "@/app/services/api/api";

export const useTodoManagement = () => {
    const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient();

    const { mutate: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: (newTodoResponse) => {
            queryClient.setQueryData(["todos"], (oldData: Todo[] | undefined) => {
                return oldData ? [newTodoResponse.data, ...oldData] : [newTodoResponse.data];
            });
        },
    });

    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (_, todoId) => {
            queryClient.setQueryData(["todos"], (oldData: Todo[] | undefined) => {
                return oldData ? oldData.filter((todo) => todo.id !== todoId) : [];
            });
        },
    });

    const handleTodoAdd = () => {
        if (!newTodo.trim()) return;

        addTodoMutation({
            userId: 1,
            id: Date.now(),
            title: newTodo,
            completed: false,
        });

        setNewTodo("");
    };

    return {
        newTodo,
        setNewTodo,
        handleTodoAdd,
        deleteTodo: deleteTodoMutation,
    };
};
