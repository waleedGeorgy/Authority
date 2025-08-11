"use server"

import { registerSchema } from "@/schemas"
import z from "zod"

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid inputs' }
    }

    return {
        success: 'Account created successfully'
    }
}