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
import Course from "@/lib/models/Course";
import Blog from "@/lib/models/Blog";
import Gallery from "@/lib/models/Gallery";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const [
      contactsCount,
      admissionsCount,
      franchisesCount,
      careersCount,
      enquiriesCount,
      newsletterCount,
      coursesCount,
      blogsCount,
      galleryCount,
      studentsCount,
      teachersCount,
      recentContacts,
      recentAdmissions,
    ] = await Promise.all([
      Contact.countDocuments(),
      Admission.countDocuments(),
      Franchise.countDocuments(),
      Career.countDocuments(),
      CourseEnquiry.countDocuments(),
      Newsletter.countDocuments({ isActive: true }),
      Course.countDocuments(),
      Blog.countDocuments(),
      Gallery.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Admission.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          contacts: contactsCount,
          admissions: admissionsCount,
          franchises: franchisesCount,
          careers: careersCount,
          enquiries: enquiriesCount,
          newsletter: newsletterCount,
          courses: coursesCount,
          blogs: blogsCount,
          gallery: galleryCount,
          students: studentsCount,
          teachers: teachersCount,
        },
        recentContacts,
        recentAdmissions,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/analytics failed:", error);
    return NextResponse.json({ success: false, message: "Failed to load analytics" }, { status: 500 });
  }
}
