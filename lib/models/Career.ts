import mongoose, { Schema, models, model } from "mongoose";

export interface ICareer {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeUrl: string;
  coverNote?: string;
  status: "new" | "shortlisted" | "rejected" | "hired";
  createdAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    position: { type: String, required: true },
    experience: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    coverNote: { type: String },
    status: { type: String, enum: ["new", "shortlisted", "rejected", "hired"], default: "new" },
  },
  { timestamps: true }
);

export default models.Career || model<ICareer>("Career", CareerSchema);
