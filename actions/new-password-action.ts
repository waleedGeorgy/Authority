"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getPasswordResetTokenByTokenId } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { newPasswordSchema } from "@/schemas";

export const newPasswordAction = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  if (!token) {
    return { error: "Token not found" };
  }

  const validatedFields = newPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid values entered" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByTokenId(token);
  if (!existingToken) return { error: "Invalid token" };

  const isTokenExpired = new Date(existingToken.expires) < new Date();
  if (isTokenExpired) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingToken) return { error: "Email not found" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser?.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetTokens.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated successfully" };
};
