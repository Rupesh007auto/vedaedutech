import mongoose, { Schema, models, model } from "mongoose";

export interface IAdmission {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  dob: string;
  courseInterested: string;
  currentClass: string;
  address: string;
  status: "pending" | "reviewed" | "admitted" | "rejected";
  createdAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    studentName: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    dob: { type: String, required: true },
    courseInterested: { type: String, required: true },
    currentClass: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ["pending", "reviewed", "admitted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default models.Admission || model<IAdmission>("Admission", AdmissionSchema);
