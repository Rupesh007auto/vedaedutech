import mongoose, { Schema, models, model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  tags: string[];
  status: "draft" | "published";
  views: number;
  publishedAt?: Date;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "General" },
    author: { type: String, default: "VedaEdutech Team" },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
