import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ProtectedRoutesLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login/");
    }

    return (
        <div className="flex flex-col items-center justify-center gap-y-6">
            <Navbar />
            {children}
        </div>

    );
}

export default ProtectedRoutesLayout;