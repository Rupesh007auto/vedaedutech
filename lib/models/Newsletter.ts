import mongoose, { Schema, models, model } from "mongoose";

export interface INewsletter {
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "subscribedAt", updatedAt: false } }
);

export default models.Newsletter || model<INewsletter>("Newsletter", NewsletterSchema);
