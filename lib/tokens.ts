import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { get2FATokenByEmail } from "@/data/twofactor-token";

export const generate2FToken = async (email: string) => {
  const existingToken = await get2FATokenByEmail(email);
  if (existingToken) {
    await db.twoFactorTokens.delete({
      where: { id: existingToken.id },
    });
  }

  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);

  const twoFactorToken = await db.twoFactorTokens.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetTokens.delete({
      where: { id: existingToken.id },
    });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const passwordResetToken = await db.passwordResetTokens.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return passwordResetToken;
};

export const generateVerToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationTokens.delete({
      where: { id: existingToken.id },
    });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const verToken = await db.verificationTokens.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return verToken;
};
