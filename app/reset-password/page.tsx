"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import Logo from "@/components/ui/Logo";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      setStatus("success");
      setTimeout(() => router.push("/login/student"), 2000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (!token) {
    return (
      <div className="text-center text-white/70">
        <AlertCircle className="mx-auto mb-3 text-red-300" size={32} />
        Invalid or missing reset token. Please request a new reset link.
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto mb-4 text-brand-green" size={44} />
        <h2 className="font-display text-lg font-bold text-white">Password reset!</h2>
        <p className="mt-2 text-sm text-white/60">Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-6 text-center font-display text-lg font-bold text-white">Set a New Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="hidden" {...register("token")} value={token} />
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/70">New Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder:text-white/30 focus:border-amber focus:outline-none"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-300">{errors.password.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/70">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber focus:outline-none"
          />
          {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-300">{errors.confirmPassword.message}</p>}
        </div>
        {status === "error" && <p className="text-xs text-red-300">{message}</p>}
        <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
          {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Reset Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-navy-dark px-4 py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10"
      >
        <div className="mb-8 flex justify-center">
          <Logo variant="light" size="md" />
        </div>
        <Suspense fallback={<Loader2 className="mx-auto animate-spin text-white" />}>
          <ResetPasswordForm />
        </Suspense>
      </motion.div>
    </div>
  );
}
