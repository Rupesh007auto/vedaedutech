"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { courseEnquirySchema, type CourseEnquiryInput } from "@/lib/validations/forms";

export default function CourseEnquiryForm({
  courseTitle,
  onClose,
}: {
  courseTitle: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseEnquiryInput>({
    resolver: zodResolver(courseEnquirySchema),
    defaultValues: { course: courseTitle },
  });

  const onSubmit = async (data: CourseEnquiryInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/course-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-premium"
        >
          <button onClick={onClose} className="absolute right-5 top-5 text-navy-dark/40 hover:text-navy-dark">
            <X size={20} />
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 size={44} className="text-brand-green" />
              <h3 className="font-display text-lg font-bold text-navy-dark">Enquiry sent!</h3>
              <p className="text-sm text-navy-dark/60">Our counsellor will call you shortly about {courseTitle}.</p>
              <button onClick={onClose} className="btn-primary mt-2 !py-2 !px-6 !text-xs">Close</button>
            </div>
          ) : (
            <>
              <h3 className="mb-1 font-display text-lg font-bold text-navy-dark">Enquire about</h3>
              <p className="mb-5 text-sm font-semibold text-teal">{courseTitle}</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("course")} />
                <div>
                  <input {...register("name")} placeholder="Your name" className="input-field" />
                  {errors.name && <p className="error-text">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("phone")} placeholder="10-digit mobile number" className="input-field" />
                  {errors.phone && <p className="error-text">{errors.phone.message}</p>}
                </div>
                <div>
                  <input {...register("email")} type="email" placeholder="Email address" className="input-field" />
                  {errors.email && <p className="error-text">{errors.email.message}</p>}
                </div>
                <button type="submit" disabled={status === "loading"} className="btn-accent w-full">
                  {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Get a Callback"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
