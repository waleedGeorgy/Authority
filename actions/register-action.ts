"use server";
import { registerSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerToken } from "@/lib/tokens";
import { sendVerEmail } from "@/lib/mail";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid inputs" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return { error: "User already exists" };
  }

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  const verificationToken = await generateVerToken(email);

  await sendVerEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation email sent",
  };
};
