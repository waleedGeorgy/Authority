"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const LoginButton = ({ children }: { children: ReactNode }) => {
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