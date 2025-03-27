import apiClient from "./apiClient";
import { Todo } from "@/app/types/todo.types";

export const getData = async () => {
    const response = await apiClient.get<Todo[]>("/todos?_limit=10");
    return response.data;
};

export const addTodo = async (todo: Todo) => {
    return apiClient.post<Todo>("/todos", todo);

};

export const deleteTodo = async (todoId: number) => {
    return apiClient.delete(`/todos/${todoId}`);
};
