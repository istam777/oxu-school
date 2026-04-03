import { useState } from "react";
import { adminService } from "../../services/adminService";
import { resolveMediaUrl } from "../../utils/media";

export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await adminService.uploadImage(file);
      onChange(response.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-brand-primary">{label}</label>
      <input value={value || ""} onChange={(event) => onChange(event.target.value)} className="input-field" placeholder="Rasm URL yoki yuklangan fayl manzili" />
      <label className="inline-flex cursor-pointer items-center rounded-2xl border border-dashed border-brand-secondary/30 px-4 py-3 text-sm font-medium text-brand-secondary">
        {uploading ? "Yuklanmoqda..." : "Rasm yuklash"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>
      {value && <img src={resolveMediaUrl(value)} alt="Oldindan ko'rish" className="h-40 w-full rounded-2xl object-cover" />}
    </div>
  );
}
