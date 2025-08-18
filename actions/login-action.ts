"use server";
import * as z from "zod";
import { AuthError } from "next-auth";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { get2FATokenByEmail } from "@/data/twofactor-token";
import { get2FAConfirmationByUserId } from "@/data/twofactor-confirmation";
import { generate2FToken, generateVerToken } from "@/lib/tokens";
import { send2FAEmail, sendVerEmail } from "@/lib/mail";
import { db } from "@/lib/db";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid inputs" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verToken = await generateVerToken(existingUser.email);

    await sendVerEmail(verToken.email, verToken.token);

    return { success: "Confirmation email sent" };
  }

  if (existingUser.email && existingUser.is2FAEnabled) {
    if (code) {
      const twoFactorToken = await get2FATokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid code entered" };
      if (twoFactorToken.token !== code)
        return { error: "Invalid code entered" };

      const isTokenExpired = new Date(twoFactorToken.expires) < new Date();
      if (isTokenExpired) return { error: "Code expired" };

      await db.twoFactorTokens.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await get2FAConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generate2FToken(existingUser.email);

      await send2FAEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
