import { db } from "@/lib/db";

export const get2FATokenByTokenId = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorTokens.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const get2FATokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorTokens.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
