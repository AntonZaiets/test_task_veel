import { cn } from "@/app/utils/stylesUtils";
import { TColors } from "@/types";

export const styles = {
    button: (color: TColors, pending: boolean) =>
        cn(
            "text-white px-4 py-2 rounded transition-all ease-in-out duration-400 cursor-pointer hover:scale-98",
            pending ? "bg-gray-400" :
                color === "red" ? "bg-red-400 hover:bg-red-600" :
                    color === "blue" ? "bg-blue-400 hover:bg-blue-600" : ""
        ),
};
