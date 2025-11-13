import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  is2FAEnabled: boolean;
  isOAuth: boolean;
};
