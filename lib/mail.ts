import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_APP_PUBLIC_URL;

export const send2FAEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Authority <onboarding@resend.dev>",
    to: email,
    subject: "Two-factor authentication",
    html: `<p>Here is your two-factor authentication code: ${token}.</p><br /><p>Your 2FA token will expire in <b>10 minutes</b>.</p>`,
  });
};

export const sendVerEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Authority <onboarding@resend.dev>",
    to: email,
    subject: "Email confirmation",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p><p>Your token will expire in <b>1 hour</b>.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Authority <onboarding@resend.dev>",
    to: email,
    subject: "Password reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p><p>Your token will expire in <b>1 hour</b>.</p>`,
  });
};
