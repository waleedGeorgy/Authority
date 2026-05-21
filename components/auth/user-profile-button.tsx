"use client";
import Link from "next/link";
import { CircleUserRound, User, LogOut, House } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "./logout-button";

const UserProfileButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage alt={`Avatar of ${user?.name}`} src={user?.image || ""} />
                    <AvatarFallback>
                        <User size={25} />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-max">
                <DropdownMenuLabel className="text-white/70 font-normal flex items-center gap-x-2">
                    <CircleUserRound />{user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/" className="flex flex-row items-center gap-x-2"><House className="mt-[1px]" />Home</Link>
                </DropdownMenuItem>
                <LogoutButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="mt-px" />Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserProfileButton;