import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, { message: "Invalid username" }),
});
