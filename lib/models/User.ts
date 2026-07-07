import mongoose, { Schema, models, model } from "mongoose";

export type UserRole = "admin" | "teacher" | "student";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  // Student-specific
  studentClass?: string;
  rollNumber?: string;
  // Teacher-specific
  subject?: string;
  qualification?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "teacher", "student"], required: true },
    phone: { type: String, trim: true },
    avatar: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    studentClass: { type: String },
    rollNumber: { type: String },
    subject: { type: String },
    qualification: { type: String },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1, role: 1 });

export default models.User || model<IUser>("User", UserSchema);
