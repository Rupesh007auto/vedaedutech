import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/lib/models/Newsletter";
import { newsletterSchema } from "@/lib/validations/forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }
    await dbConnect();

    const existing = await Newsletter.findOne({ email: parsed.data.email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      return NextResponse.json({ success: true, message: "You're already subscribed!" });
    }

    await Newsletter.create(parsed.data);
    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("POST /api/newsletter failed:", error);
    return NextResponse.json({ success: false, message: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    console.error("GET /api/newsletter failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}
