"use client";
import { useRouter } from "next/navigation";

const LoginButton = ({ children }: { children: React.ReactNode }) => {
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