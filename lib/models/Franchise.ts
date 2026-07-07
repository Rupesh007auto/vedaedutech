import mongoose, { Schema, models, model } from "mongoose";

export interface IFranchise {
  applicantName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  investmentCapacity: string;
  experience: string;
  message?: string;
  status: "new" | "contacted" | "approved" | "rejected";
  createdAt: Date;
}

const FranchiseSchema = new Schema<IFranchise>(
  {
    applicantName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    investmentCapacity: { type: String, required: true },
    experience: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ["new", "contacted", "approved", "rejected"], default: "new" },
  },
  { timestamps: true }
);

export default models.Franchise || model<IFranchise>("Franchise", FranchiseSchema);
