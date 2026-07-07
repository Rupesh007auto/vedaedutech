"use client";

import { useSession } from "next-auth/react";
import { User, Mail, Shield, Phone } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">My Profile</h1>
      <div className="max-w-xl rounded-2xl border border-navy/5 bg-white p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">
            {session?.user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-display text-lg font-bold text-navy-dark">{session?.user?.name}</p>
            <p className="text-sm capitalize text-navy-dark/50">{session?.user?.role}</p>
          </div>
        </div>
        <div className="space-y-4 border-t border-navy/5 pt-6">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-navy-dark/40" />
            <span className="text-navy-dark/70">{session?.user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield size={16} className="text-navy-dark/40" />
            <span className="capitalize text-navy-dark/70">{session?.user?.role} Account</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-navy-dark/40" />
            <span className="text-navy-dark/70">Not provided</span>
          </div>
        </div>
      </div>
    </div>
  );
}
