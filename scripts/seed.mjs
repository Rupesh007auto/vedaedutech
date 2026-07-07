/**
 * Seed script - creates demo Admin, Teacher, and Student accounts.
 * Run with: node scripts/seed.mjs
 * Requires MONGODB_URI to be set (loaded from .env.local automatically).
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    role: { type: String, enum: ["admin", "teacher", "student"] },
    phone: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const demoUsers = [
    { name: "Admin User", email: "admin@vedaedutech.in", password: "Admin@123", role: "admin", phone: "9999900001" },
    { name: "Demo Teacher", email: "teacher@vedaedutech.in", password: "Teacher@123", role: "teacher", phone: "9999900002" },
    { name: "Demo Student", email: "student@vedaedutech.in", password: "Student@123", role: "student", phone: "9999900003" },
  ];

  for (const u of demoUsers) {
    const existing = await User.findOne({ email: u.email, role: u.role });
    if (existing) {
      console.log(`Skipping ${u.email} (${u.role}) - already exists`);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 12);
    await User.create({ ...u, password: hashed });
    console.log(`Created ${u.role}: ${u.email} / ${u.password}`);
  }

  console.log("\nSeed complete. Demo login credentials:");
  demoUsers.forEach((u) => console.log(`  ${u.role.padEnd(8)} -> ${u.email} / ${u.password}`));

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
