"use client"
import { UserLock } from 'lucide-react';
import { UserRole } from "@prisma/client";
import { toast } from "sonner"
import { adminAction } from "@/actions/admin-action";
import { RoleGate } from "./role-gate";
import { Button } from "../ui/button";
import ProtectedRouteCard from "./protected-routes-card";

const AdminPanel = () => {
    const onApiRouteClick = async () => {
        const results = await fetch("/api/admin");
        if (results.ok) toast.success("Admin API route hit successfully.");
        else toast.error("Failed to hit the admin API route.");
    }

    const onServerActionClick = async () => {
        const results = await adminAction();
        if (results.success) toast.success(results.success);
        if (results.error) toast.error(results.error);
    }

    return (
        <ProtectedRouteCard title="Admin Panel" icon={<UserLock size={32} className="mt-0.5" />}>
            <RoleGate allowedRole={UserRole.ADMIN}>
                <div className="flex flex-row flex-wrap items-center justify-between gap-x-1 py-2 px-3 rounded-xl border bg-accent">
                    <p className="font-medium">Admin-only API Route</p>
                    <Button onClick={onApiRouteClick} className="cursor-pointer" size="sm" variant="outline">Test route</Button>
                </div>
                <div className="flex flex-row flex-wrap items-center justify-between gap-x-1 py-2 px-3 rounded-xl border bg-accent">
                    <p className="font-medium">Admin-only Server Action</p>
                    <Button onClick={onServerActionClick} className="cursor-pointer" size="sm" variant="outline">Test action</Button>
                </div>
            </RoleGate>
        </ProtectedRouteCard>
    );
}

export default AdminPanel;