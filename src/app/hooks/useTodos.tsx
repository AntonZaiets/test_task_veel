import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "@/app/types/todo.types";

const getData = async () => {
    const response = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10");
    return response.data;
};

export const addTodo = async (todo: Todo) => {
    return axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo);
};

export const deleteTodo = async (todoId: number) => {
    return axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
};

export const useTodos = (isEnabled = true) => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getData,
        enabled: isEnabled,
    });
};

/*export const useTodoAdd = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTodo,
        onSuccess: (newTodo) => {
            queryClient.setQueryData(["todos"], (oldData: Todo[] | undefined) => {
                return oldData ? [newTodo.data, ...oldData] : [newTodo.data];
            });
        },
    });
};*/

export const useTodoDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: (_, todoId) => {
            queryClient.setQueryData(["todos"], (oldData: Todo[] | undefined) => {
                return oldData ? oldData.filter((todo) => todo.id !== todoId) : [];
            });
        },
    });
};
