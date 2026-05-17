import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
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