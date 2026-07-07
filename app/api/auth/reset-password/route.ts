import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import PasswordResetToken from "@/lib/models/PasswordResetToken";
import { resetPasswordSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid data" },
        { status: 400 }
      );
    }

    await dbConnect();

    const resetToken = await PasswordResetToken.findOne({
      token: parsed.data.token,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return NextResponse.json(
        { success: false, message: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    await User.findByIdAndUpdate(resetToken.userId, { password: hashedPassword });
    resetToken.used = true;
    await resetToken.save();

    return NextResponse.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("POST /api/auth/reset-password failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
