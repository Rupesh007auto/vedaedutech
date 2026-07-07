import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Franchise from "@/lib/models/Franchise";
import { franchiseSchema } from "@/lib/validations/forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = franchiseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }
    await dbConnect();
    const franchise = await Franchise.create(parsed.data);
    return NextResponse.json({ success: true, data: franchise });
  } catch (error) {
    console.error("POST /api/franchise failed:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const franchises = await Franchise.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: franchises });
  } catch (error) {
    console.error("GET /api/franchise failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}
