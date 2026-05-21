import { ReactNode } from "react";
import { logout } from "@/actions/logout";

const LogoutButton = ({ children }: { children: ReactNode }) => {
    return (
        <span onClick={() => logout()} className="cursor-pointer">
            {children}
        </span>
    );
}

export default LogoutButton;