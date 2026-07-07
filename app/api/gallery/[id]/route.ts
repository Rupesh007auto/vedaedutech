import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

const utapi = new UTApi();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const item = await Gallery.findById(params.id);
    if (!item) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    if (item.fileKey) {
      await utapi.deleteFiles(item.fileKey).catch(() => null);
    }
    await Gallery.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await dbConnect();
    const updated = await Gallery.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/gallery/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}
