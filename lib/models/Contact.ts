import mongoose, { Schema, models, model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, default: "General Enquiry" },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "contacted", "resolved"], default: "new" },
  },
  { timestamps: true }
);

export default models.Contact || model<IContact>("Contact", ContactSchema);
