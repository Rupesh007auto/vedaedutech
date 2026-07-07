import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admission from "@/lib/models/Admission";
import { admissionSchema } from "@/lib/validations/forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = admissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }
    await dbConnect();
    const admission = await Admission.create(parsed.data);
    return NextResponse.json({ success: true, data: admission });
  } catch (error) {
    console.error("POST /api/admission failed:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const admissions = await Admission.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: admissions });
  } catch (error) {
    console.error("GET /api/admission failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}
