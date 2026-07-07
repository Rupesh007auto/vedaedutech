import mongoose, { Schema, models, model } from "mongoose";

export interface IPasswordResetToken {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  used: boolean;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.PasswordResetToken ||
  model<IPasswordResetToken>("PasswordResetToken", PasswordResetTokenSchema);
