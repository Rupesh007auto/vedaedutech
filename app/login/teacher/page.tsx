import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Teacher Login",
  robots: { index: false, follow: false },
};

export default function TeacherLoginPage() {
  return <LoginForm role="teacher" />;
}
