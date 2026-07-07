import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const filter = role ? { role } : {};
    const users = await User.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("GET /api/users failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    const existing = await User.findOne({ email: body.email.toLowerCase(), role: body.role });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "A user with this email and role already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await User.create({ ...body, password: hashedPassword });
    const { password: _password, ...safeUser } = user.toObject();
    return NextResponse.json({ success: true, data: safeUser });
  } catch (error) {
    console.error("POST /api/users failed:", error);
    return NextResponse.json({ success: false, message: "Failed to create user" }, { status: 500 });
  }
}
