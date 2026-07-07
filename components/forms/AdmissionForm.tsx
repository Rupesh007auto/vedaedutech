"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, GraduationCap } from "lucide-react";
import { admissionSchema, type AdmissionInput } from "@/lib/validations/forms";

const CLASSES = ["Nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const COURSES = ["Smart Classes", "Spoken English", "Computer Basics", "Competitive Exam Prep", "Vocational Training"];

export default function AdmissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionInput>({ resolver: zodResolver(admissionSchema) });

  const onSubmit = async (data: AdmissionInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/admission", {
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
        <GraduationCap size={48} className="text-brand-green" />
        <h3 className="font-display text-xl font-bold text-navy-dark">Application submitted!</h3>
        <p className="text-sm text-navy-dark/60">
          Our admissions team will contact you within 2 business days to confirm next steps.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-2 !py-2 !px-5 !text-xs">
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Student Name</label>
          <input {...register("studentName")} placeholder="Student's full name" className="input-field" />
          {errors.studentName && <p className="error-text">{errors.studentName.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Parent / Guardian Name</label>
          <input {...register("parentName")} placeholder="Parent's full name" className="input-field" />
          {errors.parentName && <p className="error-text">{errors.parentName.message}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Email Address</label>
          <input {...register("email")} type="email" placeholder="you@example.com" className="input-field" />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Phone Number</label>
          <input {...register("phone")} placeholder="10-digit mobile number" className="input-field" />
          {errors.phone && <p className="error-text">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Date of Birth</label>
          <input {...register("dob")} type="date" className="input-field" />
          {errors.dob && <p className="error-text">{errors.dob.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Current Class</label>
          <select {...register("currentClass")} className="input-field">
            <option value="">Select class</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.currentClass && <p className="error-text">{errors.currentClass.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Course Interested In</label>
          <select {...register("courseInterested")} className="input-field">
            <option value="">Select course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.courseInterested && <p className="error-text">{errors.courseInterested.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Address</label>
        <textarea {...register("address")} rows={3} placeholder="Complete residential address" className="input-field resize-none" />
        {errors.address && <p className="error-text">{errors.address.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
        {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Submit Application"}
      </button>
    </form>
  );
}
