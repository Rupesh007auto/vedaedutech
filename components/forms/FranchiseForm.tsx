"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Handshake } from "lucide-react";
import { franchiseSchema, type FranchiseInput } from "@/lib/validations/forms";

const INVESTMENT = ["Under ₹2 Lakhs", "₹2 - 5 Lakhs", "₹5 - 10 Lakhs", "Above ₹10 Lakhs"];
const EXPERIENCE = ["First-time entrepreneur", "1-3 years business experience", "3+ years business experience", "Existing education center owner"];

export default function FranchiseForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FranchiseInput>({ resolver: zodResolver(franchiseSchema) });

  const onSubmit = async (data: FranchiseInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/franchise", {
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
        <Handshake size={48} className="text-brand-green" />
        <h3 className="font-display text-xl font-bold text-navy-dark">Enquiry received!</h3>
        <p className="text-sm text-navy-dark/60">Our franchise development team will reach out within 48 hours.</p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-2 !py-2 !px-5 !text-xs">
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Full Name</label>
          <input {...register("applicantName")} placeholder="Your name" className="input-field" />
          {errors.applicantName && <p className="error-text">{errors.applicantName.message}</p>}
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">City</label>
          <input {...register("city")} placeholder="Your city" className="input-field" />
          {errors.city && <p className="error-text">{errors.city.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">State</label>
          <input {...register("state")} placeholder="Your state" className="input-field" />
          {errors.state && <p className="error-text">{errors.state.message}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Investment Capacity</label>
          <select {...register("investmentCapacity")} className="input-field">
            <option value="">Select range</option>
            {INVESTMENT.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          {errors.investmentCapacity && <p className="error-text">{errors.investmentCapacity.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Business Experience</label>
          <select {...register("experience")} className="input-field">
            <option value="">Select experience</option>
            {EXPERIENCE.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {errors.experience && <p className="error-text">{errors.experience.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Message (optional)</label>
        <textarea {...register("message")} rows={3} placeholder="Tell us about your goals" className="input-field resize-none" />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
        {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Submit Franchise Enquiry"}
      </button>
    </form>
  );
}
