import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const filter = category && category !== "All" ? { category } : {};
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("GET /api/gallery failed:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const item = await Gallery.create(body);
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("POST /api/gallery failed:", error);
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  }
}
