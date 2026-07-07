import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const filter = !status || status === "all" ? {} : { status };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("GET /api/blog failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const slug = slugify(body.title);
    const blog = await Blog.create({
      ...body,
      slug,
      publishedAt: body.status === "published" ? new Date() : undefined,
    });
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("POST /api/blog failed:", error);
    return NextResponse.json({ success: false, message: "Failed to create blog" }, { status: 500 });
  }
}
