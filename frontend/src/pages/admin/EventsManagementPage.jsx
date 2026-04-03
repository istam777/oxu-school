import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import DataTable from "../../components/admin/DataTable";
import ImageUploadField from "../../components/admin/ImageUploadField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const initialForm = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  featuredImage: "",
  category: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  location: "",
  published: true,
};

export default function EventsManagementPage() {
  useDocumentTitle("Tadbirlar boshqaruvi");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const loadEvents = () => {
    adminService.getEvents(0, 50).then((response) => setItems(response.content));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await adminService.updateEvent(editingId, form);
    } else {
      await adminService.createEvent(form);
    }
    setForm(initialForm);
    setEditingId(null);
    loadEvents();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Tadbirlar</p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-primary">
              {editingId ? "Tadbirni tahrirlash" : "Yangi tadbir qo'shish"}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              className="button-secondary"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              Bekor qilish
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="Sarlavha" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="input-field" placeholder="Slug (ixtiyoriy)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <input className="input-field" placeholder="Kategoriya" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="input-field" placeholder="Manzil" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <input type="date" className="input-field" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} required />
          <input type="time" className="input-field" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          <input type="time" className="input-field" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-brand-canvas px-4 py-3 text-sm font-medium text-slate-600">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Saytda e'lon qilish
          </label>
        </div>

        <textarea className="textarea-field mt-4" placeholder="Qisqa tavsif" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required />
        <textarea className="textarea-field mt-4 min-h-40" placeholder="To'liq tavsif" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <div className="mt-4">
          <ImageUploadField label="Asosiy rasm" value={form.featuredImage} onChange={(value) => setForm({ ...form, featuredImage: value })} />
        </div>
        <button type="submit" className="button-primary mt-6">{editingId ? "Yangilash" : "Saqlash"}</button>
      </form>

      <DataTable
        columns={[
          { key: "title", label: "Sarlavha" },
          { key: "eventDate", label: "Sana" },
          { key: "location", label: "Manzil" },
          { key: "published", label: "Holat", render: (row) => (row.published ? "E'lon qilingan" : "Qoralama") },
        ]}
        rows={items}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-brand-primary"
              onClick={() => {
                setEditingId(row.id);
                setForm({
                  title: row.title,
                  slug: row.slug,
                  summary: row.summary,
                  description: row.description,
                  featuredImage: row.featuredImage,
                  category: row.category || "",
                  eventDate: row.eventDate,
                  startTime: row.startTime || "",
                  endTime: row.endTime || "",
                  location: row.location || "",
                  published: row.published,
                });
              }}
            >
              Tahrirlash
            </button>
            <button type="button" className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700" onClick={() => setConfirmId(row.id)}>
              O'chirish
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="Tadbirni o'chirish"
        description="Bu amalni ortga qaytarib bo'lmaydi."
        onCancel={() => setConfirmId(null)}
        onConfirm={async () => {
          await adminService.deleteEvent(confirmId);
          setConfirmId(null);
          loadEvents();
        }}
      />
    </div>
  );
}
