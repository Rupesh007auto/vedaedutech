"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import Logo from "@/components/ui/Logo";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setStatus("success");
      setMessage(json.message);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

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

        {status === "success" ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 text-brand-green" size={44} />
            <h2 className="font-display text-lg font-bold text-white">Check your email</h2>
            <p className="mt-2 text-sm text-white/60">{message}</p>
          </div>
        ) : (
          <>
            <h2 className="mb-1 text-center font-display text-lg font-bold text-white">Forgot Password?</h2>
            <p className="mb-6 text-center text-sm text-white/60">
              Enter your email and we&apos;ll send you a reset link.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
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
              {status === "error" && <p className="text-xs text-red-300">{message}</p>}
              <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
                {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          </>
        )}

        <Link href="/login/student" className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/50 hover:text-white">
          <ArrowLeft size={13} /> Back to login
        </Link>
      </motion.div>
    </div>
  );
}
