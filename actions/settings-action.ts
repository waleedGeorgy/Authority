"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerEmail } from "@/lib/mail";
import { generateVerToken } from "@/lib/tokens";
import { settingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const settingsAction = async (
  values: z.infer<typeof settingsSchema>
) => {
  const user = await currentUser();
  if (!user) return { error: "No user session" };

  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) return { error: "No user with these credentials" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.is2FAEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already exists" };

    const verToken = await generateVerToken(values.email);

    await sendVerEmail(verToken.email, verToken.token);

    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const matchingPasswords = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!matchingPasswords) return { error: "Current password is incorrect" };

    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedNewPassword;
    values.newPassword = undefined;
  }

  try {
    await db.user.update({
      where: { id: dbUser.id },
      data: { ...values },
    });

    return { success: "Settings updated" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
