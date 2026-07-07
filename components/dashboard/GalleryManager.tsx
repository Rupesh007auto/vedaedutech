"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Trash2, Upload, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const CATEGORIES = ["Campus", "Events", "Classroom", "CSP Centers", "Achievements", "Other"];

export default function GalleryManager() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Other");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      return (json.data || []) as GalleryItem[];
    },
  });

  const { startUpload, isUploading } = useUploadThing("galleryImage", {
    onClientUploadComplete: async (res) => {
      if (res?.[0]) {
        await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title || "Untitled",
            category,
            imageUrl: res[0].url,
            fileKey: res[0].key,
          }),
        });
        setTitle("");
        queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      }
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-lg font-bold text-navy-dark">Manage Gallery</h2>

      <div className="mb-8 rounded-2xl border border-navy/5 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <input className="input-field" placeholder="Image title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy/15 bg-navy/[0.02] px-4 py-3 text-sm text-navy-dark/60 hover:border-teal hover:bg-teal/5">
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <><Upload size={16} /> Upload Image</>}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) startUpload([file]);
              }}
            />
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy/30" size={28} /></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {(data || []).map((item) => (
            <div key={item._id} className="group relative overflow-hidden rounded-2xl">
              <Image src={item.imageUrl} alt={item.title} width={300} height={220} className="h-40 w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-between bg-navy-dark/0 p-3 opacity-0 transition-all group-hover:bg-navy-dark/50 group-hover:opacity-100">
                <button onClick={() => handleDelete(item._id)} className="ml-auto rounded-lg bg-white/90 p-1.5 text-red-500 hover:bg-white">
                  <Trash2 size={14} />
                </button>
                <p className="text-xs font-medium text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
