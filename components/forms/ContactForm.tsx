"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/forms";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Something went wrong");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-3xl bg-brand-green/10 p-10 text-center"
      >
        <CheckCircle2 size={48} className="text-brand-green" />
        <h3 className="font-display text-xl font-bold text-navy-dark">Message sent successfully!</h3>
        <p className="text-sm text-navy-dark/60">Our team will get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-2 !py-2 !px-5 !text-xs">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Full Name</label>
          <input {...register("name")} placeholder="Your name" className="input-field" />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Phone Number</label>
          <input {...register("phone")} placeholder="10-digit mobile number" className="input-field" />
          {errors.phone && <p className="error-text">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Email Address</label>
        <input {...register("email")} type="email" placeholder="you@example.com" className="input-field" />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Subject</label>
        <input {...register("subject")} placeholder="How can we help?" className="input-field" />
        {errors.subject && <p className="error-text">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Message</label>
        <textarea {...register("message")} rows={4} placeholder="Tell us more..." className="input-field resize-none" />
        {errors.message && <p className="error-text">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
        {status === "loading" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            Send Message <Send size={16} className="ml-2" />
          </>
        )}
      </button>
    </form>
  );
}
