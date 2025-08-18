"use client"
import { UserRole } from "@prisma/client";
import { FormError } from "../form-output";
import { useCurrentRole } from "@/hooks/use-current-role";

interface roleGateProps {
    children: React.ReactNode,
    allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole }: roleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="You are not allowed to view this contents" />
        );
    }
    return (
        <>
            {children}
        </>
    );
}