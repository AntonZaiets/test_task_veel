"use client";

import {useEffect, useState} from "react";
import {useTodos} from "@/app/hooks/useTodos";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "@/app/todo.types";
import axios from "axios";

export default function TodoListApp () {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");
  const isAuth = true;
  const {data, isLoading, isError} = useTodos(isAuth)

  const {mutate, isPending, isSuccess} = useMutation({
      mutationKey: ['add todo'],
      mutationFn: async (newTodoAdd: Todo) => axios.post('https://jsonplaceholder.typicode.com/todos', newTodoAdd),
      onSuccess: () => {
          queryClient.setQueryData(['todos'], (oldData: Todo[]) => {
              return [
                  { userId: 1, id: Date.now(), title: newTodo, completed: false },
                  ...oldData
              ]
          });
      },
  })

    /*useEffect(() => {
        if (isSuccess) {
            queryClient.setQueryData(['todos'], (oldData: Todo[]) => {
                console.log('111111111111111111', oldData);
                return Array.isArray(oldData) ? [
                    { userId: 1, id: Date.now(), title: newTodo, completed: false },
                    ...oldData
                ] : [];
            });
        }
    }, [isSuccess, newTodo, queryClient]);*/




    if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{isError}</p>;

  return (
      <div className="p-6 mx-auto bg-white shadow-md space-y-4 h-screen flex flex-col">
        <h1 className="text-2xl font-bold text-center text-gray-700">Todo List</h1>
        <div className="flex space-x-2">
          <input
              type="text"
              placeholder="New task description..."
              className="flex-1 bg-gray-200 rounded-md text-gray-700 p-2 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded transition-all ease-in-out duration-500 hover:bg-blue-700"
              onClick={() => {
                  if (!newTodo.trim()) return;
                  mutate({
                      userId: 1,
                      id: Date.now(),
                      title: newTodo,
                      completed: false,
                  });
                  setNewTodo("");
              }}
              disabled={isPending}
          >
              {isPending ? 'Loading...' : 'Add'}
          </button>
        </div>
        <div className="flex overflow-y-auto justify-center w-full">
          <div className="flex flex-wrap gap-5 justify-center w-full">
            {data?.map((todo) => (
                <div
                    key={todo.id}
                    className={`min-w-[200px] w-[calc(100%/5-1rem)] p-4 flex flex-col place-content-between rounded-md ${todo.completed ? "bg-emerald-200" : "bg-sky-200"}`}
                >
                  <span className="text-gray-700 break-words">{todo.title}</span>
                  <div>
                    <span
                        className="mt-5 text-gray-400 block text-sm">{todo.completed ? "Status: Completed" : "Status: In Progress"}</span>
                    <button
                        className="w-full bg-red-400 text-white mt-1 px-2 py-1 rounded transition-all ease-in-out duration-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
            ))}
          </div>

        </div>
      </div>
  );
}
