import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verToken = await db.verificationTokens.findFirst({
      where: { email },
    });
    return verToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verToken = await db.verificationTokens.findUnique({
      where: { token },
    });
    return verToken;
  } catch (error) {
    return null;
  }
};
