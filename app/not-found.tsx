import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-dark px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-40" />
      <div className="relative">
        <p className="font-display text-8xl font-extrabold text-white/10">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-sm text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-accent">
            <Home size={16} className="mr-2" /> Back to Home
          </Link>
          <Link href="/courses" className="btn-outline !border-white/20 !bg-white/5 !text-white hover:!bg-white hover:!text-navy-dark">
            <Search size={16} className="mr-2" /> Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
