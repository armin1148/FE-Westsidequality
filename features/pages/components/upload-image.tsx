"use client";
import { api } from "@/lib/axios/api";
import { useState } from "react";
import Image from "next/image";
type UploadImageProps = {
  value?: string;
  onChange: (url: string) => void;
};

const UploadImage = ({ value, onChange }: UploadImageProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res: any = await api.postForm("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    onChange(res.result?.imageUrl || "");

    setLoading(false);
  };

  return (
    <div className="space-y-2">
      {typeof value === "string" && value && (
        <Image
          src={value}
          alt="preview"
          className="w-32 h-32 object-cover rounded"
          width={128}
          height={128}
          unoptimized
        />
      )}

      <input
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadImage;
