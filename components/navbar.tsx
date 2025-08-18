"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "./ui/button";
import UserProfileButton from "./auth/user-profile-button";

const Navbar = () => {
    const path = usePathname();
    const role = useCurrentRole();

    return (
        <nav className="bg-indigo-700 py-3 px-1 flex justify-around items-center gap-x-1 w-full flex-wrap">
            <div className="flex space-x-2">
                <Button asChild variant={path == "/profile" ? "secondary" : "outline"} size="lg">
                    <Link href="/profile">Profile</Link>
                </Button>
                {role === "ADMIN" && (
                    <Button asChild variant={path == "/admin" ? "secondary" : "outline"} size="lg">
                        <Link href="/admin">Admin</Link>
                    </Button>
                )}
                <Button asChild variant={path == "/settings" ? "secondary" : "outline"} size="lg">
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <UserProfileButton />
        </nav>
    );
}

export default Navbar;