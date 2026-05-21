"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const LoginButton = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    return (
        <span onClick={() => router.push("/auth/login")} className="cursor-pointer">
            {children}
        </span>
    );
}

export default LoginButton;