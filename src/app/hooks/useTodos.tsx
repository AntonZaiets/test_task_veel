import { useQuery } from "@tanstack/react-query";
import {getData} from "@/app/services/api/api";

export const useTodos = (isEnabled = true) => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getData,
        enabled: isEnabled,
    });
};
