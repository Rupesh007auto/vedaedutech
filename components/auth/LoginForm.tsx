"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import Logo from "@/components/ui/Logo";

const roleConfig = {
  admin: { label: "Admin", demo: "admin@vedaedutech.in / Admin@123", accent: "from-brand-purple to-navy" },
  teacher: { label: "Teacher", demo: "teacher@vedaedutech.in / Teacher@123", accent: "from-teal to-navy" },
  student: { label: "Student", demo: "student@vedaedutech.in / Student@123", accent: "from-amber to-brand-orange" },
};

export default function LoginForm({ role }: { role: "admin" | "teacher" | "student" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const config = roleConfig[role];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role,
        redirect: false,
      });

      if (result?.error) {
        setStatus("error");
        setErrorMsg(result.error);
        return;
      }

      const callbackUrl = searchParams.get("callbackUrl") || `/dashboard/${role}`;
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-dark px-4 py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10"
      >
        <div className="mb-8 flex justify-center">
          <Logo variant="light" size="md" />
        </div>

        <div className={`mb-6 rounded-2xl bg-gradient-to-r ${config.accent} p-4 text-center`}>
          <p className="font-display text-sm font-bold text-white">{config.label} Login</p>
          <p className="mt-0.5 text-[11px] text-white/80">Demo: {config.demo}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/70">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:border-amber focus:outline-none"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-red-300">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/70">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder:text-white/30 focus:border-amber focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs text-red-300">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-white/60">
              <input {...register("remember")} type="checkbox" className="rounded border-white/20 bg-white/5" />
              Remember me
            </label>
            <Link href="/forgot-password" className="font-semibold text-amber hover:underline">
              Forgot password?
            </Link>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-300">
              <AlertCircle size={15} className="shrink-0" /> {errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
            {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-4 text-xs text-white/40">
          {(["admin", "teacher", "student"] as const)
            .filter((r) => r !== role)
            .map((r) => (
              <Link key={r} href={`/login/${r}`} className="hover:text-white/70">
                {roleConfig[r].label} Login
              </Link>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
