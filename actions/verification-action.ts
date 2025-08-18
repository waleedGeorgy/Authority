"use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db";

export const emailVerificationAction = async (tokenId: string) => {
    const existingToken = await getVerificationTokenByToken(tokenId);
    if (!existingToken) return { error: "Token does not exist" }

    const isTokenExpired = new Date(existingToken.expires) < new Date();
    if (isTokenExpired) return { error: "Token has expired" }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "Email does not exist" }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await db.verificationTokens.delete({
        where: { id: existingToken.id }
    });

    return { success: "Email verified successfully" }
}