import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendPasswordResetEmail(to: string, resetUrl: string, name: string) {
  if (!resend) {
    // eslint-disable-next-line no-console
    console.log(`[DEV] Resend not configured. Password reset link for ${to}: ${resetUrl}`);
    return { simulated: true };
  }

  return resend.emails.send({
    from: process.env.EMAIL_FROM || "VedaEdutech <no-reply@vedaedutech.in>",
    to,
    subject: "Reset your VedaEdutech password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background:#F7F9FC;">
        <h2 style="color:#12294B;">Reset your password</h2>
        <p style="color:#334155;">Hi ${name}, we received a request to reset your VedaEdutech password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block; margin-top:16px; padding:12px 28px; background:#E3A008; color:#0B1A33; text-decoration:none; font-weight:700; border-radius:999px;">Reset Password</a>
        <p style="color:#94A3B8; font-size:12px; margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
