import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import PasswordResetToken from "@/lib/models/PasswordResetToken";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { generateToken } from "@/lib/utils";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });

    // Always respond success (don't leak whether an email exists).
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists with that email, a reset link has been sent.",
      });
    }

    const token = generateToken(40);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await PasswordResetToken.create({ userId: user._id, token, expiresAt });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    await sendPasswordResetEmail(user.email, resetUrl, user.name);

    return NextResponse.json({
      success: true,
      message: "If an account exists with that email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("POST /api/auth/forgot-password failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
