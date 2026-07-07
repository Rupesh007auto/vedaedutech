"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Briefcase, Upload, FileCheck } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { careerSchema, type CareerInput } from "@/lib/validations/forms";

const POSITIONS = ["Subject Teacher", "Center Coordinator", "Franchise Manager", "Software Developer", "Digital Marketing Executive", "Other"];
const EXPERIENCE = ["Fresher", "1-2 years", "3-5 years", "5+ years"];

export default function CareerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CareerInput>({ resolver: zodResolver(careerSchema), defaultValues: { resumeUrl: "" } });

  const { startUpload, isUploading } = useUploadThing("resumeUpload", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        setValue("resumeUrl", res[0].url, { shouldValidate: true });
      }
    },
  });

  const onSubmit = async (data: CareerInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Something went wrong");
      setStatus("success");
      reset();
      setFileName("");
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
        <Briefcase size={48} className="text-brand-green" />
        <h3 className="font-display text-xl font-bold text-navy-dark">Application received!</h3>
        <p className="text-sm text-navy-dark/60">Our HR team will review your profile and get in touch.</p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-2 !py-2 !px-5 !text-xs">
          Apply for another role
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Position</label>
          <select {...register("position")} className="input-field">
            <option value="">Select position</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.position && <p className="error-text">{errors.position.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Experience</label>
          <select {...register("experience")} className="input-field">
            <option value="">Select experience</option>
            {EXPERIENCE.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {errors.experience && <p className="error-text">{errors.experience.message}</p>}
        </div>
      </div>

      <Controller
        name="resumeUrl"
        control={control}
        render={({ field }) => (
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Resume (PDF)</label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy/15 bg-navy/[0.02] px-4 py-6 text-sm text-navy-dark/60 transition-colors hover:border-teal hover:bg-teal/5">
              {isUploading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : field.value ? (
                <span className="flex items-center gap-2 text-brand-green"><FileCheck size={18} /> {fileName || "Resume uploaded"}</span>
              ) : (
                <span className="flex items-center gap-2"><Upload size={18} /> Click to upload your resume (PDF, max 4MB)</span>
              )}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFileName(file.name);
                    startUpload([file]);
                  }
                }}
              />
            </label>
            {errors.resumeUrl && <p className="error-text">{errors.resumeUrl.message}</p>}
          </div>
        )}
      />

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-navy-dark/70">Cover Note (optional)</label>
        <textarea {...register("coverNote")} rows={3} placeholder="Why do you want to join VedaEdutech?" className="input-field resize-none" />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === "loading" || isUploading} className="btn-accent w-full">
        {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Submit Application"}
      </button>
    </form>
  );
}
