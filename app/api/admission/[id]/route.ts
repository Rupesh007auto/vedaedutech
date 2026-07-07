import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admission from "@/lib/models/Admission";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await dbConnect();
    const updated = await Admission.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/admission/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deleted = await Admission.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admission/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
