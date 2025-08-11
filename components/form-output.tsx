import { BsExclamationTriangle } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";

interface formOutputProps {
    message?: string
}

export const FormError = ({ message }: formOutputProps) => {
    if (!message) {
        return null;
    }
    return (
        <div className="flex items-center w-full space-x-2 justify-center bg-destructive/20 p-2 rounded-md text-sm text-destructive">
            <BsExclamationTriangle size={15} />
            <p>{message}</p>
        </div>
    )
}

export const FormSuccess = ({ message }: formOutputProps) => {
    if (!message) {
        return null;
    }
    return (
        <div className="flex items-center w-full space-x-2 justify-center bg-emerald-500/20 p-2 rounded-md text-sm text-emerald-400">
            <BsExclamationCircle size={15} />
            <p>{message}</p>
        </div>
    )
}