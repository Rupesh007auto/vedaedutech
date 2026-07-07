import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Student Login",
  robots: { index: false, follow: false },
};

export default function StudentLoginPage() {
  return <LoginForm role="student" />;
}
