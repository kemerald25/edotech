"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "events" | "blog" | "members" | "partners";
  placeholder?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  folder = "events",
  placeholder = "https://...",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          {label} (Cloudinary CDN)
        </label>
        {value && (
          <span className="text-[10px] text-secondary font-medium flex items-center gap-1">
            <CheckCircle2 className="size-3" />
            Stored in Supabase
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setPreview(e.target.value);
            }}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>

        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-200 cursor-pointer transition shrink-0">
          {uploading ? (
            <Loader2 className="size-3.5 animate-spin text-secondary" />
          ) : (
            <UploadCloud className="size-3.5 text-secondary" />
          )}
          <span>{uploading ? "Uploading..." : "Upload to Cloudinary"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {preview && (
        <div className="relative h-24 w-full rounded-2xl overflow-hidden border border-white/10 bg-black/30 mt-2">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => {}}
          />
        </div>
      )}
    </div>
  );
}
