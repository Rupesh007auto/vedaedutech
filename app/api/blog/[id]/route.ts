import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await dbConnect();
    if (body.status === "published") {
      const existing = await Blog.findById(params.id);
      if (existing && !existing.publishedAt) body.publishedAt = new Date();
    }
    const updated = await Blog.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/blog/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
