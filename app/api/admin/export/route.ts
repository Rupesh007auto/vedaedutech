import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";
import Admission from "@/lib/models/Admission";
import Franchise from "@/lib/models/Franchise";
import Career from "@/lib/models/Career";
import CourseEnquiry from "@/lib/models/CourseEnquiry";
import Newsletter from "@/lib/models/Newsletter";

const MODELS: Record<string, unknown> = {
  contact: Contact,
  admission: Admission,
  franchise: Franchise,
  career: Career,
  "course-enquiry": CourseEnquiry,
  newsletter: Newsletter,
};

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]).filter((h) => h !== "__v");
  const escape = (val: unknown) => `"${String(val ?? "").replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ];
  return lines.join("\n");
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const resource = searchParams.get("resource") || "contact";
    const format = searchParams.get("format") || "csv";

    const Model = MODELS[resource] as import("mongoose").Model<unknown>;
    if (!Model) {
      return NextResponse.json({ success: false, message: "Unknown resource" }, { status: 400 });
    }

    await dbConnect();
    const docs = await Model.find().sort({ createdAt: -1 }).lean();
    const rows = docs.map((d) => {
      const { _id, ...rest } = d as Record<string, unknown>;
      return { id: String(_id), ...rest };
    });

    if (format === "csv") {
      const csv = toCsv(rows);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${resource}-export.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("GET /api/admin/export failed:", error);
    return NextResponse.json({ success: false, message: "Export failed" }, { status: 500 });
  }
}
