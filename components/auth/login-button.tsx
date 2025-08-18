"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode,
}

const LoginButton = ({ children }: LoginButtonProps) => {
    const router = useRouter();

    const buttonClicked = () => {
        router.push("/auth/login");
    }

    return (
        <span onClick={buttonClicked} className="cursor-pointer">
            {children}
        </span>
    );
}

export default LoginButton;