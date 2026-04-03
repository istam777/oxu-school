import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import DataTable from "../../components/admin/DataTable";
import ImageUploadField from "../../components/admin/ImageUploadField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const initialForm = { title: "", imageUrl: "", category: "" };

export default function GalleryManagementPage() {
  useDocumentTitle("Galereya boshqaruvi");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [confirmId, setConfirmId] = useState(null);

  const loadGallery = () => adminService.getGallery().then(setItems);

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div className="space-y-8">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await adminService.createGallery(form);
          setForm(initialForm);
          loadGallery();
        }}
        className="rounded-[2rem] bg-white p-8 shadow-card"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Galereya</p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-primary">Galereyaga rasm qo'shish</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="Sarlavha" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="input-field" placeholder="Kategoriya" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        </div>
        <div className="mt-4">
          <ImageUploadField label="Galereya rasmi" value={form.imageUrl} onChange={(value) => setForm({ ...form, imageUrl: value })} />
        </div>
        <button type="submit" className="button-primary mt-6">Saqlash</button>
      </form>

      <DataTable
        columns={[
          { key: "title", label: "Sarlavha" },
          { key: "category", label: "Kategoriya" },
          { key: "uploadedAt", label: "Yuklangan sana" },
        ]}
        rows={items}
        actions={(row) => (
          <button type="button" className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700" onClick={() => setConfirmId(row.id)}>
            O'chirish
          </button>
        )}
      />

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="Rasmni o'chirish"
        description="Galereyadan ushbu rasm olib tashlanadi."
        onCancel={() => setConfirmId(null)}
        onConfirm={async () => {
          await adminService.deleteGallery(confirmId);
          setConfirmId(null);
          loadGallery();
        }}
      />
    </div>
  );
}
