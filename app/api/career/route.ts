import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Career from "@/lib/models/Career";
import { careerSchema } from "@/lib/validations/forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = careerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }
    await dbConnect();
    const career = await Career.create(parsed.data);
    return NextResponse.json({ success: true, data: career });
  } catch (error) {
    console.error("POST /api/career failed:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const careers = await Career.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: careers });
  } catch (error) {
    console.error("GET /api/career failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}
