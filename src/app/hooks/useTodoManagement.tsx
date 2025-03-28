import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {addTodo, deleteTodo} from "@/app/services/api/todosApi";
import { v4 as uuidv4 } from "uuid";
import {ITodo} from "@/types";

export const useTodoManagement = () => {
    const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient();

    const { mutate: addTodoMutation, isPending: addPending } = useMutation({
        mutationFn: addTodo,
        onSuccess: (newTodoResponse) => {
            queryClient.setQueryData(["todos"], (oldData: ITodo[] | undefined) => {
                return oldData ? [newTodoResponse.data, ...oldData] : [newTodoResponse.data];
            });
        },
    });

    const { mutate: deleteTodoMutation, isPending: deletePending } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (_, todoId) => {
            queryClient.setQueryData(["todos"], (oldData: ITodo[] | undefined) => {
                return oldData ? oldData.filter((todo) => todo.id !== todoId) : [];
            });
        },
    });

    const handleTodoAdd = () => {
        if (!newTodo.trim()) return;

        addTodoMutation({
            userId: 1,
            id: uuidv4(),
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
        addPending,
        deletePending
    };
};
