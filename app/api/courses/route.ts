import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/lib/models/Course";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = { isActive: true };
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter).sort({ featured: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error("GET /api/courses failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const slug = slugify(body.title);
    const course = await Course.create({ ...body, slug });
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("POST /api/courses failed:", error);
    return NextResponse.json({ success: false, message: "Failed to create course" }, { status: 500 });
  }
}
