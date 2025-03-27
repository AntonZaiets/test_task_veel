import axios from "axios";
import { Todo } from "@/app/types/todo.types";

export const getData = async () => {
    const response = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10");
    return response.data;
};

export const addTodo = async (todo: Todo) => {
    return axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo);
};

export const deleteTodo = async (todoId: number) => {
    return axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
};