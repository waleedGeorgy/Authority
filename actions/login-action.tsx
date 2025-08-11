"use server"

import { loginSchema } from "@/schemas"
import z from "zod"

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid inputs' }
    }

    return {
        success: 'Login successful'
    }
}