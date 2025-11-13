import { Roboto_Condensed } from "next/font/google";
import { FaUserLock } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface headerProps {
    label: string
}

const roboto = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['600']
})

const Header = ({ label }: headerProps) => {
    return (
        <div className="w-full flex flex-col gap-y-2 items-center justify-center mb-2">
            <div className="flex flex-row items-center justify-center space-x-2">
                <FaUserLock size={33} className="mb-0.5" />
                <h1 className={cn("text-4xl font-semibold", roboto.className)}>
                    <span className="text-indigo-700">Auth</span>ority
                </h1>
            </div>
            <p className="text-md">{label}</p>
        </div>

    );
}

export default Header;