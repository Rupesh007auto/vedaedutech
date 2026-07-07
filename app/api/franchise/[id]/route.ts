import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Franchise from "@/lib/models/Franchise";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await dbConnect();
    const updated = await Franchise.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/franchise/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deleted = await Franchise.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/franchise/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
