"use client";

import { useState } from "react";
import { Bell, Lock, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">Settings</h1>

      <div className="max-w-xl space-y-6">
        <div className="rounded-2xl border border-navy/5 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display font-bold text-navy-dark">
            <Bell size={18} /> Notification Preferences
          </h2>
          <label className="flex items-center justify-between">
            <span className="text-sm text-navy-dark/70">Email me about important updates</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-5 w-9 appearance-none rounded-full bg-navy/10 outline-none transition-colors checked:bg-teal relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-navy/5 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display font-bold text-navy-dark">
            <Lock size={18} /> Change Password
          </h2>
          <div className="space-y-3">
            <input type="password" placeholder="Current password" className="input-field" />
            <input type="password" placeholder="New password" className="input-field" />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-accent">
          {saving ? <Loader2 size={18} className="animate-spin" /> : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
