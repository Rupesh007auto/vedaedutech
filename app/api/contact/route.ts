import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";
import { contactSchema } from "@/lib/validations/forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }
    await dbConnect();
    const contact = await Contact.create(parsed.data);
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error("POST /api/contact failed:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("GET /api/contact failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}
