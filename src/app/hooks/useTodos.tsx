import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import axios from "axios";
import {Todo} from "@/app/todo.types";


const getData = async () => {
    return axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10")
}
export function useTodos(isEnabled: boolean){
    const {data, isLoading, isSuccess, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: getData,
        select: data => data.data,
        enabled: isEnabled,
    })

    useEffect(() => {
        if(isSuccess) console.log('Fetched successfully')
    }, [isSuccess, data])

    useEffect(() => {
        if(isError) console.log('Error fetching')
    }, [isError])

    return {data, isLoading, isError}
}