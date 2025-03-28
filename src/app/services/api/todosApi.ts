import apiClient from "./apiClient";
import {ITodo} from "@/types";


export const getData = async () => {
    const response = await apiClient.get<ITodo[]>("/todos?_limit=10");
    return response.data;
};

export const addTodo = async (todo: ITodo) => {
    return apiClient.post<ITodo>("/todos", todo);

};

export const deleteTodo = async (todoId: number) => {
    return apiClient.delete(`/todos/${todoId}`);
};
