import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/app/types/todo.types";
import axios from "axios";
import {addTodo, deleteTodo} from "@/app/hooks/useTodos";

export const useTodoManagement = () => {
    const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient();

    // Mutation for adding a new todo
    const { mutate: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: (newTodoResponse) => {
            queryClient.setQueryData(["todos"], (oldData: Todo[] | undefined) => {
                return oldData ? [newTodoResponse.data, ...oldData] : [newTodoResponse.data];
            });
        },
    });

    // Mutation for deleting a todo
    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (_, todoId) => {
            queryClient.setQueryData(["todos"], (oldData: Todo[] | undefined) => {
                return oldData ? oldData.filter((todo) => todo.id !== todoId) : [];
            });
        },
    });

    // Handler for adding a new todo
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
