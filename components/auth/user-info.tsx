import { currentUser } from "@/lib/auth";
import ProtectedRouteCard from "./protected-routes-card";
import { Badge } from "../ui/badge";
import { CircleUserRound } from 'lucide-react';

export const UserInfo = async () => {
    const user = await currentUser();

    return (
        <ProtectedRouteCard title="Profile Info" icon={<CircleUserRound size={32} />}>
            <div className="flex flex-row flex-wrap items-center justify-between gap-x-1 py-2 px-3 rounded-xl border bg-accent">
                <p className="font-medium">ID</p>
                <p className="font-mono text-sm font-light truncate">{user?.id}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between py-2 px-3 rounded-xl border bg-accent">
                <p className="font-medium">Name</p>
                <p className="font-mono text-sm font-light truncate">{user?.name}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between py-2 px-3 rounded-xl border bg-accent">
                <p className="font-medium">Email</p>
                <p className="font-mono text-sm font-light truncate">{user?.email}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between py-2 px-3 rounded-xl border bg-accent">
                <p className="font-medium">Role</p>
                <p className="font-mono text-sm font-light">{user?.role}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between py-2 px-3 rounded-xl border bg-accent">
                <p className="font-medium">2FA</p>
                <Badge variant={user?.is2FAEnabled ? "success" : "destructive"} className="mx-0 font-mono text-sm">{user?.is2FAEnabled ? "ON" : "OFF"}</Badge>
            </div>
        </ProtectedRouteCard>

    )
}