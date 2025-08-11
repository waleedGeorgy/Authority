"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode,
    mode?: 'modal' | 'redirect',
    asChild?: boolean
}

const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
    const router = useRouter();

    const buttonClicked = () => {
        router.push("/auth/login");
    }

    if (mode === 'modal') {
        return (
            <span>
                TODO: add modal
            </span>
        )
    }

    return (
        <span onClick={buttonClicked} className="cursor-pointer">
            {children}
        </span>
    );
}

export default LoginButton;