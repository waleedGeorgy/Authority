import * as z from "zod";
import { UserRole } from "@prisma/client";

export const settingsSchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.email().min(1).optional(),
    password: z
      .string()
      .min(6, { message: "Minimum of 6 characters are required" })
      .optional(),
    newPassword: z
      .string()
      .min(6, { message: "Minimum of 6 characters are required" })
      .optional(),
    is2FAEnabled: z.boolean().optional(),
    role: z.enum(UserRole),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Both old and new passwords are required",
      path: ["newPassword"],
    }
  );

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters are required",
  }),
});

export const resetSchema = z.object({
  email: z.email({ message: "Invalid email" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters are required",
  }),
  name: z.string().min(1, { message: "Invalid username" }),
});
