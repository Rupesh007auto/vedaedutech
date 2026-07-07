import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Image as ImageIcon,
  FileText, Mail, Handshake, Briefcase, Newspaper, User, Settings, LogOut,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const adminNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Enquiries", href: "/dashboard/admin/enquiries", icon: Mail },
  { label: "Admissions", href: "/dashboard/admin/admissions", icon: GraduationCap },
  { label: "Franchise Leads", href: "/dashboard/admin/franchise", icon: Handshake },
  { label: "Careers", href: "/dashboard/admin/careers", icon: Briefcase },
  { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
  { label: "Gallery", href: "/dashboard/admin/gallery", icon: ImageIcon },
  { label: "Blog", href: "/dashboard/admin/blog", icon: Newspaper },
  { label: "Teachers", href: "/dashboard/admin/teachers", icon: Users },
  { label: "Students", href: "/dashboard/admin/students", icon: GraduationCap },
];

export const teacherNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/teacher", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/teacher/courses", icon: BookOpen },
  { label: "Students", href: "/dashboard/teacher/students", icon: Users },
];

export const studentNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
  { label: "Resources", href: "/dashboard/student/resources", icon: FileText },
];

export const sharedNav: NavItem[] = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
