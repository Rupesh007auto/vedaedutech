import mongoose, { Schema, models, model } from "mongoose";

export interface IGalleryItem {
  title: string;
  category: string;
  imageUrl: string;
  fileKey: string;
  createdAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Campus", "Events", "Classroom", "CSP Centers", "Achievements", "Other"],
      default: "Other",
    },
    imageUrl: { type: String, required: true },
    fileKey: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Gallery || model<IGalleryItem>("Gallery", GallerySchema);
