import mongoose, { Schema, models, model } from "mongoose";

export interface ICourse {
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  mode: "Online" | "Offline" | "Hybrid";
  fee: number;
  image: string;
  syllabus: string[];
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, enum: ["Online", "Offline", "Hybrid"], default: "Hybrid" },
    fee: { type: Number, required: true },
    image: { type: String, default: "" },
    syllabus: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Course || model<ICourse>("Course", CourseSchema);
