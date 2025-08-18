import { db } from "@/lib/db";

export const getPasswordResetTokenByTokenId = async (tokenId: string) => {
  try {
    const passwordResetToken = await db.passwordResetTokens.findUnique({
      where: { token: tokenId },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetTokens.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};