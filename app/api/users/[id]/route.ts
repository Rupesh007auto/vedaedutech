import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await dbConnect();
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 12);
    } else {
      delete body.password;
    }
    const updated = await User.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/users/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/users/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
