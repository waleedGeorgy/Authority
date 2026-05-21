import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (session?.user) {
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    return (
        <div className="flex h-full flex-col items-center justify-center">
            {children}
        </div>
    );
}

export default AuthLayout;