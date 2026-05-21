import { FaRegCircleXmark } from "react-icons/fa6";
import { FcOk } from "react-icons/fc";

export const FormError = ({ message }: { message?: string }) => {
    if (!message) {
        return null;
    }
    return (
        <div className="flex items-center w-full space-x-2 justify-center bg-destructive/20 p-2 rounded-md text-sm text-destructive">
            <FaRegCircleXmark size={17} />
            <p>{message}</p>
        </div>
    )
}

export const FormSuccess = ({ message }: { message?: string }) => {
    if (!message) {
        return null;
    }
    return (
        <div className="flex items-center w-full space-x-2 justify-center bg-emerald-500/20 p-2 rounded-md text-sm text-emerald-400">
            <FcOk size={17} />
            <p>{message}</p>
        </div>
    )
}