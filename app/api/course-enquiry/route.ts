import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CourseEnquiry from "@/lib/models/CourseEnquiry";
import { courseEnquirySchema } from "@/lib/validations/forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = courseEnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }
    await dbConnect();
    const enquiry = await CourseEnquiry.create(parsed.data);
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("POST /api/course-enquiry failed:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await CourseEnquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("GET /api/course-enquiry failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}
