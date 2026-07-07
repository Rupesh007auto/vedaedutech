import mongoose, { Schema, models, model } from "mongoose";

export interface ICourseEnquiry {
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  status: "new" | "contacted" | "converted";
  createdAt: Date;
}

const CourseEnquirySchema = new Schema<ICourseEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ["new", "contacted", "converted"], default: "new" },
  },
  { timestamps: true }
);

export default models.CourseEnquiry || model<ICourseEnquiry>("CourseEnquiry", CourseEnquirySchema);
