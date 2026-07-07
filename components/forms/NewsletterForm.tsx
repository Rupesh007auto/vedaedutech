"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/forms";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Subscription failed");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white">
        <CheckCircle2 size={18} className="text-brand-green" /> Subscribed! Watch your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex items-center overflow-hidden rounded-full border border-white/15 bg-white/5 pr-1.5 backdrop-blur-xl">
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full bg-transparent px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-amber to-brand-orange px-5 py-2.5 text-xs font-bold text-navy-dark transition-transform hover:scale-105 disabled:opacity-60"
        >
          {status === "loading" ? "..." : <>Subscribe <Send size={13} /></>}
        </button>
      </div>
      {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email.message}</p>}
      {status === "error" && <p className="mt-2 text-xs text-red-300">{errorMsg}</p>}
    </form>
  );
}
