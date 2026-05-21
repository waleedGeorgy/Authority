"use client"
import { ReactNode } from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-output";

export const RoleGate = ({ children, allowedRole }: { children: ReactNode, allowedRole: UserRole }) => {
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